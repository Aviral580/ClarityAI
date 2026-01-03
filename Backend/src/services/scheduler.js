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