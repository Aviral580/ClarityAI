import { Router } from "express";
import { processCommand } from "../controllers/aiController.js";
import { protect } from "../middlewares/auth.js"; // Your existing auth middleware

const router = Router();

// Protected Route: User must be logged in to talk to Clarity AI

router.route("/command").post(processCommand);

export default router;