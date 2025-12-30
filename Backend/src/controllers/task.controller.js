import Task from "../models/Task.js"; // Import the model above
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// 1. GET TASKS (For Calendar View)
// Returns tasks overlapping the requested start/end range
export const getTasks = asyncHandler(async (req, res) => {
    const { start, end } = req.query;
    const userId = req.user._id;

    if (!start || !end) {
        throw new ApiError(400, "Start and End dates are required");
    }

    // Find tasks that overlap with the view range
    const tasks = await Task.find({
        userId,
        // Filter: Task Start < Range End AND Task End > Range Start
        start: { $lt: new Date(end) },
        end: { $gt: new Date(start) },
        status: { $ne: "skipped" }
    });

    return res.status(200).json(
        new ApiResponse(200, tasks, "Tasks fetched successfully")
    );
});

// 2. CREATE TASK (Manual Entry)
export const createTask = asyncHandler(async (req, res) => {
    const { title, duration, priority, date, start } = req.body;
    const userId = req.user._id;

    if (!title || !duration) {
        throw new ApiError(400, "Title and Duration are required");
    }

    // If manual start is provided, calculate end. Otherwise leave pending.
    let calculatedEnd = null;
    let finalStatus = "pending";

    if (start) {
        const startTime = new Date(start);
        calculatedEnd = new Date(startTime.getTime() + duration * 60000);
        finalStatus = "scheduled";
    }

    const task = await Task.create({
        userId,
        title,
        duration,
        priority: priority || 2,
        date: date || new Date(),
        start: start || null,
        end: calculatedEnd,
        status: finalStatus,
        createdBy: "manual"
    });

    return res.status(201).json(
        new ApiResponse(201, task, "Task created successfully")
    );
});

// 3. UPDATE TASK (Drag & Drop / Resize)
export const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { start, end, title, priority, status } = req.body;

    // Find task and ensure ownership
    const task = await Task.findOne({ _id: id, userId: req.user._id });
    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    // Update fields if provided
    if (title) task.title = title;
    if (priority) task.priority = priority;
    if (status) task.status = status;

    // Handle Rescheduling (Drag & Drop)
    if (start && end) {
        task.start = start;
        task.end = end;
        task.status = "scheduled";

        // Recalculate duration just in case
        const diffMs = new Date(end) - new Date(start);
        task.duration = Math.round(diffMs / 60000);
    }

    await task.save();

    return res.status(200).json(
        new ApiResponse(200, task, "Task updated successfully")
    );
});

// 4. DELETE TASK
export const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Task deleted successfully")
    );
});