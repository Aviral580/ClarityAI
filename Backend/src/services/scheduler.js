import { Task } from "../models/Task.js";

export const checkConflicts = async (userId, startTime, endTime) => {
    const overlappingTask = await Task.findOne({
        userId,
        status: { $ne: "Completed" },
        $and: [
            { startTime: { $lt: new Date(endTime) } },
            { endTime: { $gt: new Date(startTime) } }
        ]
    });

    return overlappingTask;
};

export const saveAiTasks = async (userId, aiTasks, originalCommand) => {
    const savedTasks = [];
    
    for (const taskData of aiTasks) {
        const newTask = await Task.create({
            userId,
            title: taskData.title,
            category: taskData.category,
            priority: taskData.priority,
            startTime: taskData.startTime,
            endTime: taskData.endTime,
            isFixed: taskData.isFixed,
            originalCommand: originalCommand
        });
        savedTasks.push(newTask);
    }
    
    return savedTasks;
};

export const findAlternativeSlots = async (userId, date, durationMinutes) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
        userId,
        startTime: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ startTime: 1 });

    let possibleStartTime = new Date(date);
    // If testing for "today", don't suggest times in the past
    if (possibleStartTime < new Date()) {
        possibleStartTime = new Date();
    }

    for (const task of tasks) {
        const gap = (task.startTime - possibleStartTime) / (1000 * 60);
        if (gap >= durationMinutes) {
            return possibleStartTime;
        }
        possibleStartTime = new Date(task.endTime);
    }

    return possibleStartTime; 
};