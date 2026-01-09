import {Task} from "../models/Task.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// 1. GET TASKS (For Calendar View)
export const getTasks = asyncHandler(async (req, res) => {
    const { start, end } = req.query;
    const userId = req.user._id;

    if (!start || !end) {
        throw new ApiError(400, "Start and End dates are required");
    }

    const tasks = await Task.find({
        userId,
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
    // Destructure ALL fields sent from Frontend
    const {
        title,
        duration,
        description,
        priority,
        category,
        date,
        dueDate,
        start
    } = req.body;

    const userId = req.user._id;

    if (!title || !duration) {
        throw new ApiError(400, "Title and Duration are required");
    }

    // Calculate End Time if Start is provided
    let calculatedEnd = null;
    let finalStatus = "pending";

    if (start) {
        const startTime = new Date(start);
        // duration is in minutes
        calculatedEnd = new Date(startTime.getTime() + duration * 60000);
        finalStatus = "scheduled";
    }

    const task = await Task.create({
        userId,
        title,
        description: description || "", // Save description/notes
        category: category || "work",   // Save category
        priority: priority || 2,
        duration,

        // Date handling
        date: date || new Date(),
        dueDate: dueDate || date || new Date(),

        // Scheduling
        start: start || null,
        end: calculatedEnd,
        status: finalStatus,

        createdBy: "manual"
    });

    return res.status(201).json(
        new ApiResponse(201, task, "Task created successfully")
    );
});

// 3. UPDATE TASK (Drag & Drop / Resize / Edit)
export const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Destructure ALL potential updates
    const {
        title,
        description,
        priority,
        category,
        status,
        start,
        end,
        date,
        dueDate
    } = req.body;

    const task = await Task.findOne({ _id: id, userId: req.user._id });
    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    // Update fields if they exist in the request
    if (title) task.title = title;
    if (priority) task.priority = priority;
    if (status) task.status = status;
    if (category) task.category = category;
    if (date) task.date = date;
    if (dueDate) task.dueDate = dueDate;

    // Special check for description: Allow empty string to clear it
    if (description !== undefined) {
        task.description = description;
    }

    // Handle Calendar Drag & Drop (Rescheduling)
    if (start && end) {
        task.start = start;
        task.end = end;
        task.status = "scheduled";

        // Recalculate duration automatically based on new start/end
        const diffMs = new Date(end) - new Date(start);
        task.duration = Math.round(diffMs / 60000); // Convert ms to minutes
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