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