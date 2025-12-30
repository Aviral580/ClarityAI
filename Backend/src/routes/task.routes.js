import { Router } from "express";
import { protect } from '../middlewares/auth.js';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";

const router = Router();

// Apply Auth Middleware to all task routes
router.use(protect);

// Route: /api/v1/tasks
router.route("/")
    .get(getTasks)    // Fetch tasks for calendar
    .post(createTask); // Manual create

// Route: /api/v1/tasks/:id
router.route("/:id")
    .put(updateTask)   // Drag & drop updates
    .delete(deleteTask); // Delete

export default router;