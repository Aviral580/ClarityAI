import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    index: true // Faster search
  },
  // We store the raw input so the AI can "remember" the context later
  originalCommand: {
    type: String,
  },
  category: {
    type: String,
    enum: ["Work", "Personal", "Health", "Learning", "General"],
    default: "General"
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium"
  },
  // Time Blocking Logic
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  isFixed: {
    type: Boolean,
    default: false, // True for Meetings/Classes (Hard to move), False for Study/Gym (Easy to move)
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Rescheduled", "Migrated"],
    default: "Pending"
  },
  // Stress Tracking: If this number is high, User is stressed
  rescheduleCount: {
    type: Number,
    default: 0
  },
  // Learning: We update this after the user says "That took 30 mins"
  actualDuration: {
    type: Number, // In minutes
  }
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);