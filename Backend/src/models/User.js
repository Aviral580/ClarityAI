import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // --- NEW CLARITY AI FIELDS ---
    whatsappNumber: { type: String }, // For WhatsApp notifications

    onboardingData: {
        workHours: { 
            start: { type: String, default: "09:00" }, 
            end: { type: String, default: "18:00" } 
        },
        // NEW: AI needs to know when NOT to schedule tasks
        sleepTime: { 
             start: { type: String, default: "23:00" }, 
             end: { type: String, default: "07:00" } 
        },
        energyPeak: { type: String, default: "morning" },
        avgTaskDuration: { type: Number, default: 45 }, // General fallback
        focusDays: { type: [String], default: ["Monday", "Wednesday"] }
    },

    // EXPANDED: The Brain's long-term memory
    learningMetrics: {
        totalTasksCompleted: { type: Number, default: 0 },
        lastAIGenReflection: { type: String },
        // NEW: Specific durations for specific categories (AI learns these)
        categoryDurations: {
            meeting: { type: Number, default: 60 },
            gym: { type: Number, default: 90 },
            study: { type: Number, default: 120 },
            commute: { type: Number, default: 30 }
        }
    },
    // -----------------------------

    refreshToken: {
        type: String,
    }
}, { timestamps: true });

// --- PASSWORD HASHING ---
userSchema.pre("save", async function () {
    // 1. Only hash if modified
    if (!this.isModified("password")) return; 

    try {
        // 2. Hash the password
        this.password = await bcrypt.hash(this.password, 10);
        // No next() call needed!
    } catch (error) {
        throw error; // Mongoose will catch this as a validation error
    }
});

// --- METHODS ---
// Compare password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email },
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: "15m" }
    );
};

// Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: "7d" }
    );
};

export const User = mongoose.model('User', userSchema);