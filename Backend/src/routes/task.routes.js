import express from 'express';
import { 
    getTasks, 
    createTask, 
    updateTask, 
    deleteTask 
} from "../controllers/task.controller.js";
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Route: /api/tasks/
router.get('/', protect, getTasks);
router.post('/', protect, createTask);

// Route: /api/tasks/:id
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

export default router;