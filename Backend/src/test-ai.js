import dotenv from "dotenv";
import { analyzeUserCommand } from "./services/aiService.js";

// 1. Load your API Key
dotenv.config({ path: "./.env" });

const runTest = async () => {
  console.log("🧠 Waking up Clarity AI...");

  // 2. Mock User Context (What the DB would usually provide)
  const mockUserContext = {
    currentTime: new Date("2025-12-30T10:00:00.000Z"), // It's 10 AM
    sleepTime: { start: "23:00", end: "07:00" },
    workHours: { start: "09:00", end: "17:00" },
    categoryDurations: {
      meeting: 60,
      gym: 90
    }
  };

  const command = "I have a meeting with Chris at 5, and I need to hit the gym.";

  console.log(`\n🗣️  User says: "${command}"`);
  console.log("---------------------------------------------------");

  try {
    // 3. Call the Brain directly
    const result = await analyzeUserCommand(command, mockUserContext);
    
    console.log("🤖 AI Response (JSON):");
    console.log(JSON.stringify(result, null, 2));

    // Simple Check
    if (result.intent === "ADD_TASK" || result.tasks?.length > 0) {
      console.log("\n✅ SUCCESS: The AI understood the assignment!");
    } else {
      console.log("\n⚠️  WARNING: AI response was unexpected.");
    }

  } catch (error) {
    console.error("\n❌ ERROR:", error);
  }
};

runTest();