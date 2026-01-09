import dotenv from "dotenv";
dotenv.config();
 // <--- THIS MAGIC LINE FIXES THE KEY LOADING
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
// Ensure we use the 'gemini-1.5-flash' model (The free, stable one)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * The Master Function: Converts raw text -> Structured Plan
 * @param {String} command - User's raw input ("Meet Chris at 5")
 * @param {Object} userContext - { currentLocation, currentTime, userHabits, recentTasks }
 */
export const analyzeUserCommand = async (command, userContext) => {
  const { currentTime, userHabits } = userContext;

  const systemPrompt = `
    You are Clarity AI, an elite Executive Assistant.
    
    CURRENT CONTEXT:
    - Current Time: ${new Date(currentTime).toLocaleString()}
    - User's Sleep Window: ${userContext.sleepTime || "23:00 to 07:00"}
    - Work Hours: ${userContext.workHours || "09:00 to 17:00"}
    - Learning Data (Avg Durations): ${JSON.stringify(userContext.categoryDurations || {})}

    YOUR GOAL:
    Analyze the user's raw command: "${command}" and output a strictly valid JSON object.
    
    RULES:
    1. INTENT: 
       - "ADD_TASK": New tasks.
       - "CONFIRM_TASK": User accepts a suggestion (e.g., "Yes", "Okay", "Do it", "That works").
       - "REJECT_TASK": User declines a suggestion (e.g., "No", "Cancel", "I don't want to").
       - "RESCHEDULE", "QUERY", "FEEDBACK".
    2. TIME:
       - If user says "at 5", and it is currently 10 AM, assume 5 PM (17:00).
       - If user says "at 5", and it is currently 6 PM, assume 5 PM Tomorrow.
       - If no time is specified, assign a "suggestedTime" based on User's Work Hours.
    3. DURATION:
       - If not specified, ESTIMATE based on task type (e.g., "Meeting" = 60m, "Quick call" = 15m).
       - Use "Learning Data" if available.
    4. CATEGORY: Auto-tag as Work, Personal, Health, or Learning.
    5. CONFLICTS: You do NOT check database conflicts. You only suggest times.
    
    OUTPUT FORMAT (JSON ONLY, NO MARKDOWN):
    {
      "intent": "ADD_TASK",
      "tasks": [
        {
          "title": "String",
          "category": "String",
          "priority": "High/Medium/Low",
          "startTime": "ISO String (Estimated)",
          "endTime": "ISO String (Estimated)",
          "durationMinutes": Number,
          "isFixed": Boolean (True for meetings, False for solo work)
        }
      ],
      "feedback": { "taskId": "...", "actualDuration": ... }, // Only if intent is FEEDBACK
      "responseMessage": "String (A short, human-like confirmation or question)"
    }
  `;

  try {
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up if Gemini adds markdown code blocks
    const jsonStr = text.replace(/```json|```/g, "").trim();
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("AI Service Error:", error);
    // Fallback if AI fails
    return { 
      intent: "ERROR", 
      responseMessage: "I'm having trouble thinking right now. Please try again." 
    };
  }
};