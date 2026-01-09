import { Router } from "express";
import { processCommand } from "../controllers/aiController.js";
import { verifyJWT } from "../middlewares/auth.js"; // Your existing auth middleware

const router = Router();

// Protected Route: User must be logged in to talk to Clarity AI

router.route("/command").post(verifyJWT, processCommand);

export default router;