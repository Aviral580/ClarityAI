
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
    index: true
  },

  originalCommand: {
    type: String,
  },

  description: {
    type: String,
    default: ""
  },

  category: {
    type: String,
    enum: ["work", "personal", "health", "learning"],
    default: "work"
  },

  priority: {
    type: mongoose.Schema.Types.Mixed, 
    enum: ["High", "Medium", "Low", 1, 2, 3],
    default: "Medium"
  },

  // Calendar Fields used by Controller
  start: {
    type: Date,
    default: null
  },

  end: {
    type: Date,
    default: null
  },

  date: {
    type: Date,
    default: new Date()
  },

  dueDate: {
    type: Date,
    default: new Date()
  },

  duration: {
    type: Number // in minutes
  },

  isFixed: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    enum: [
      "Completed",
      "rescheduled",
      "pending",
      "scheduled",
      "skipped"
    ],
    default: "Pending"
  },

  rescheduleCount: {
    type: Number,
    default: 0
  },

  actualDuration: {
    type: Number
  },

  createdBy: {
    type: String,
    enum: ["manual", "ai"],
    default: "manual"
  }

}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);
