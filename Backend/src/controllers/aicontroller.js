import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { analyzeUserCommand } from "../services/aiService.js";
import { User } from "../models/User.js";
import { Task } from "../models/Task.js";
import { checkConflicts, saveAiTasks, findAlternativeSlots, bumpTask } from "../services/scheduler.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const processCommand = asyncHandler(async (req, res) => {
  const { command } = req.body;
  const userId = req.user.id;

  const user = await User.findById(userId);
  const userTz = user.timezone || "Asia/Kolkata";

  const userContext = {
    currentTime: dayjs().tz(userTz).format(),
    timezone: userTz,
    sleepTime: user.onboardingData?.sleepTime,
    workHours: user.onboardingData?.workHours,
    categoryDurations: user.learningMetrics?.categoryDurations,
    pendingTask: user.pendingTask
  };

  const aiResponse = await analyzeUserCommand(command, userContext);

  // ================= RESCHEDULE =================
  if (aiResponse.intent === "RESCHEDULE") {
    const { title, startTime, endTime } = aiResponse.tasks[0];

    const startUtc = dayjs(startTime).utc().toDate();
    const endUtc = dayjs(endTime).utc().toDate();

    const existingTask = await Task.findOne({
      userId,
      title: { $regex: new RegExp(title, "i") }
    }).sort({ createdAt: -1 });

    if (!existingTask) {
      return res.status(200).json(
        new ApiResponse(200, { message: `I couldn't find a task named "${title}".` }, "Task not found")
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(
      existingTask._id,
      { startTime: startUtc, endTime: endUtc, rescheduleCount: (existingTask.rescheduleCount || 0) + 1 },
      { new: true }
    );

    return res.status(200).json(
      new ApiResponse(200, {
        task: updatedTask,
        message: `Sure, I've moved your ${title} to ${dayjs(startUtc).tz(userTz).format("h:mm A")}.`
      }, "Rescheduled successfully")
    );
  }

  // ================= ADD TASK =================
  if (aiResponse.intent === "ADD_TASK") {
    for (const task of aiResponse.tasks) {

      // ✅ SINGLE SOURCE OF TRUTH (UTC)
      const startUtc = dayjs(task.startTime).utc().toDate();
      const endUtc = dayjs(task.endTime).utc().toDate();

      const conflict = await checkConflicts(userId, startUtc, endUtc);
      console.log("Conflict Check:", userId, startUtc, endUtc, conflict);

      if (conflict) {
        const priorityMap = { low: 1, medium: 2, high: 3 };
        const newPriority = priorityMap[task.priority] || 2;
        const existingPriority = priorityMap[conflict.priority] || 2;

        if (newPriority > existingPriority && !conflict.isFixed) {
          const movedTask = await bumpTask(userId, conflict);
          const savedTasks = await saveAiTasks(userId, [{
            ...task,
            startTime: startUtc,
            endTime: endUtc
          }], command);

          const newTimeForOldTask = dayjs(movedTask.startTime).tz(userTz).format("h:mm A");

          return res.status(200).json(
            new ApiResponse(200, {
              actionRequired: "NONE",
              tasks: savedTasks,
              message: `I've scheduled your ${task.title}. I moved "${conflict.title}" to ${newTimeForOldTask}.`
            }, "Priority-based rescheduling complete")
          );
        }

        // ---------- Suggest Alternative ----------
        const duration = task.durationMinutes || 60;
        const suggestedStartUtc = await findAlternativeSlots(userId, startUtc, duration);

        const humanTime = dayjs(suggestedStartUtc).tz(userTz).format("h:mm A");

        await User.findByIdAndUpdate(userId, {
          pendingTask: {
            title: task.title,
            category: task.category,
            priority: task.priority,
            startTime: suggestedStartUtc,
            endTime: new Date(suggestedStartUtc.getTime() + duration * 60000),
            durationMinutes: duration,
            isFixed: task.isFixed,
            originalCommand: command
          }
        });

        return res.status(200).json(
          new ApiResponse(200, {
            actionRequired: "CONFLICT",
            conflictWith: conflict.title,
            suggestedStartTime: suggestedStartUtc,
            message: `You have a conflict with "${conflict.title}". How about ${humanTime}?`,
            aiInterpretation: aiResponse
          }, "Conflict detected")
        );
      }
    }

    const savedTasks = await saveAiTasks(
      userId,
      aiResponse.tasks.map(t => ({
        ...t,
        startTime: dayjs(t.startTime).utc().toDate(),
        endTime: dayjs(t.endTime).utc().toDate()
      })),
      command
    );

    return res.status(200).json(
      new ApiResponse(200, {
        actionRequired: "NONE",
        tasks: savedTasks,
        message: aiResponse.responseMessage
      }, "Tasks scheduled successfully")
    );
  }

  // ================= CONFIRM =================
  if (aiResponse.intent === "CONFIRM_TASK") {
    if (!user.pendingTask) {
      return res.status(200).json(new ApiResponse(200, { message: "Nothing to confirm." }, "No pending task"));
    }

    const confirmedTask = await saveAiTasks(userId, [user.pendingTask], user.pendingTask.originalCommand);
    await User.findByIdAndUpdate(userId, { $set: { pendingTask: null } });

    return res.status(200).json(
      new ApiResponse(200, { tasks: confirmedTask, message: "Done! I've scheduled it." }, "Success")
    );
  }

  // ================= REJECT =================
  if (aiResponse.intent === "REJECT_TASK") {
    await User.findByIdAndUpdate(userId, { $set: { pendingTask: null } });
    return res.status(200).json(
      new ApiResponse(200, { message: "No problem, I've cleared it." }, "Rejected")
    );
  }

  return res.status(200).json(new ApiResponse(200, aiResponse, "Processed"));
});
