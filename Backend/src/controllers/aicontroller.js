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
  const { command, localTime } = req.body;
  // const userId = "6961d3685a4d4caa3b7d0fbd"; 
  const userId = req.user.id; 

  const user = await User.findById(userId);
  const userTz = user.timezone || "Asia/Kolkata";

  const userContext = {
    currentTime: dayjs().tz(userTz).format(),
    timezone: userTz,
    sleepTime: user.onboardingData?.sleepTime,
    workHours: user.onboardingData?.workHours,
    categoryDurations: user.learningMetrics?.categoryDurations,
    pendingTask: user.pendingTask // ADD THIS LINE
  };

  const aiResponse = await analyzeUserCommand(command, userContext);

  if (aiResponse.intent === "RESCHEDULE") {
    const { title, startTime, endTime } = aiResponse.tasks[0];
    
    // Find the existing task by title for this user
    const existingTask = await Task.findOne({ 
        userId, 
        title: { $regex: new RegExp(title, "i") } 
    }).sort({ createdAt: -1 });

    if (!existingTask) {
        return res.status(200).json(new ApiResponse(200, { message: `I couldn't find a task named "${title}" to reschedule.` }, "Task not found"));
    }

    const updatedTask = await Task.findByIdAndUpdate(
        existingTask._id,
        { startTime, endTime, rescheduleCount: (existingTask.rescheduleCount || 0) + 1 },
        { new: true }
    );

    return res.status(200).json(new ApiResponse(200, { task: updatedTask, message: `Sure, I've moved your ${title} to ${dayjs(startTime).tz(userTz).format("h:mm A")}.` }, "Rescheduled successfully"));
  }

  if (aiResponse.intent === "ADD_TASK") {
 for (const task of aiResponse.tasks) {
  // Convert task times to Date objects in UTC before checking conflicts
  const taskStart = new Date(task.startTime);
  const taskEnd = new Date(task.endTime);
  const startUtc = dayjs(task.startTime).tz(userTz).utc().toDate();
const endUtc = dayjs(task.endTime).tz(userTz).utc().toDate();

  const conflict = await checkConflicts(userId, startUtc, endUtc);
  console.log("Conflict Check:", userId, startUtc, endUtc, conflict);

  if (conflict) {
    const priorityMap = { "low": 1, "medium": 2, "high": 3 };
    const newPriority = priorityMap[task.priority] || 2;
    const existingPriority = priorityMap[conflict.priority] || 2;

    // Priority-based bumping
    if (newPriority > existingPriority && !conflict.isFixed) {
      const movedTask = await bumpTask(userId, conflict);

      // Save new task
      const savedTasks = await saveAiTasks(userId, [task], command);

      // Format rescheduled old task time for user
      const newTimeForOldTask = dayjs(movedTask.startTime).tz(userTz).format("h:mm A");
      console.log("Rescheduled Task:", movedTask);

      return res.status(200).json(
        new ApiResponse(200, {
          actionRequired: "NONE",
          tasks: savedTasks,
          message: `I've scheduled your ${task.title}. Since it was higher priority, I moved "${conflict.title}" to ${newTimeForOldTask}.`
        }, "Priority-based rescheduling complete")
      );
    }

    // Find alternative slot
    const duration = task.durationMinutes || 60;
    const suggestedTimeUTC = await findAlternativeSlots(userId, taskStart, duration);

    const humanTime = dayjs(suggestedTimeUTC).tz(userTz).format("h:mm A");

    // Save pending task in UTC format to match MongoDB
    await User.findByIdAndUpdate(userId, {
      pendingTask: {
        title: task.title,
        category: task.category,
        priority: task.priority,
        startTime: suggestedTimeUTC, // UTC Date
        endTime: new Date(suggestedTimeUTC.getTime() + duration * 60000), // UTC Date
        durationMinutes: duration,
        isFixed: task.isFixed,
        originalCommand: command
      }
    });

    return res.status(200).json(
      new ApiResponse(200, {
        actionRequired: "CONFLICT",
        conflictWith: conflict.title,
        suggestedStartTime: suggestedTimeUTC,
        message: `You have a conflict with "${conflict.title}". How about moving this to ${humanTime}?`,
        aiInterpretation: aiResponse
      }, "Conflict detected")
    );
  }
}


    const savedTasks = await saveAiTasks(userId, aiResponse.tasks, command);
    console.log(aiResponse)
    return res.status(200).json(
      new ApiResponse(200, {
        actionRequired: "NONE",
        tasks: savedTasks,
        message: aiResponse.responseMessage
      }, "Tasks scheduled successfully")
    );
  }
  
  // --- HANDLE CONFIRMATION ---
  if (aiResponse.intent === "CONFIRM_TASK") {
    if (!user.pendingTask) {
      return res.status(200).json(new ApiResponse(200, { message: "Nothing to confirm." }, "No pending task"));
    }

    const confirmedTask = await saveAiTasks(userId, [user.pendingTask], user.pendingTask.originalCommand);
    await User.findByIdAndUpdate(userId, { $set: { pendingTask: null } });

    return res.status(200).json(new ApiResponse(200, { tasks: confirmedTask, message: "Done! I've scheduled it." }, "Success"));
  }

  // --- HANDLE REJECTION ---
  if (aiResponse.intent === "REJECT_TASK") {
    await User.findByIdAndUpdate(userId, { $set: { pendingTask: null } });
    return res.status(200).json(new ApiResponse(200, { message: "No problem, I've cleared that suggestion." }, "Rejected"));
  }
  
  return res.status(200).json(new ApiResponse(200, aiResponse, "Processed"));
});