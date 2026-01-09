import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { analyzeUserCommand } from "../services/aiService.js";
import { User } from "../models/User.js";
import { checkConflicts, saveAiTasks, findAlternativeSlots } from "../services/scheduler.js";
import { asyncHandler } from "../utils/AsyncHandler.js"; 
import { ApiResponse } from "../utils/ApiResponse.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const processCommand = asyncHandler(async (req, res) => {
  const { command, localTime } = req.body;
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
  console.log("AI Response:", aiResponse);
  if (aiResponse.intent === "ADD_TASK") {
    for (const task of aiResponse.tasks) {
      const conflict = await checkConflicts(userId, task.startTime, task.endTime);
      
      if (conflict) {
        const duration = task.durationMinutes || 60;
        const suggestedTime = await findAlternativeSlots(userId, task.startTime, duration);
        
        const humanTime = dayjs(suggestedTime).tz(userTz).format("h:mm A");

        await User.findByIdAndUpdate(userId, {
          pendingTask: {
            title: task.title,
            category: task.category,
            priority: task.priority,
            startTime: suggestedTime,
            endTime: dayjs(suggestedTime).add(duration, 'minute').toDate(),
            durationMinutes: duration,
            isFixed: task.isFixed,
            originalCommand: command
          }
        });

        return res.status(200).json(
          new ApiResponse(200, {
            actionRequired: "CONFLICT",
            conflictWith: conflict.title,
            suggestedStartTime: suggestedTime,
            message: `You have a conflict with "${conflict.title}". How about moving this to ${humanTime}?`,
            aiInterpretation: aiResponse
          }, "Conflict detected")
        );
      }
    }

    const savedTasks = await saveAiTasks(userId, aiResponse.tasks, command);
    
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