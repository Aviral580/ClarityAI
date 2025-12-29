import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    onboardingData: {
        workHours: { 
            start: { type: String, default: "09:00" }, 
            end: { type: String, default: "18:00" } 
        },
        energyPeak: { type: String, default: "morning" },
        avgTaskDuration: { type: Number, default: 45 },
        focusDays: { type: [String], default: ["Monday", "Wednesday"] }
    },
    learningMetrics: {
        totalTasksCompleted: { type: Number, default: 0 },
        lastAIGenReflection: { type: String }
    }
}, { timestamps: true });

// --- PASSWORD HASHING ---
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
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
        process.env.JWT_ACCESS_SECRET, // Make sure this matches your .env
        { expiresIn: "15m" }
    );
};

// Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_REFRESH_SECRET, // Make sure this matches your .env
        { expiresIn: "7d" }
    );
};

export const User = mongoose.model('User', userSchema);