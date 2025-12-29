import mongoose from "mongoose";

const dailyLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  // Calculated implicitly: (Reschedules * Weight) + (Overload Hours)
  stressScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  tasksCompletedCount: {
    type: Number,
    default: 0
  },
  // The AI generates this text at night
  aiSummary: {
    type: String, 
    default: "" 
  }
}, { timestamps: true });

export const DailyLog = mongoose.model("DailyLog", dailyLogSchema);