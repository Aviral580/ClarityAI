import "dotenv/config";
import mongoose from "mongoose";
import { User } from "./models/User.js";
import { Task } from "./models/Task.js";
import { processCommand } from "./controllers/aiController.js";

const runTest = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        // Ensure the connection is fully 'open'
        if (mongoose.connection.readyState !== 1) {
            await new Promise((resolve) => mongoose.connection.once("open", resolve));
        }

        let testUser = await User.findOne({ email: "test@clarity.com" });
        if (!testUser) {
            testUser = await User.create({
                username: "testuser",
                email: "test@clarity.com",
                password: "password123"
            });
        }

        const req = {
            body: {
                command: "Schedule a focus session from 2 PM to 3 PM today",
                localTime: new Date().toISOString()
            },
            user: testUser
        };

        const res = {
            status: function(code) { this.statusCode = code; return this; },
            json: function(data) { this.data = data; return this; }
        };

        const next = (err) => {
            console.error("🔥 Error caught by AsyncHandler:", err.message);
        };

        console.log("🚀 Testing Controller Logic...");
        await processCommand(req, res, next);

        if (res.statusCode === 200 && res.data?.success) {
            console.log("✅ SUCCESS: Controller processed and saved task!");
            console.log("🤖 AI Message:", res.data.data.message);
        } else {
            console.log("❌ FAIL: Controller returned status", res.statusCode);
        }

    } catch (error) {
        console.error("❌ Test Script Crash:", error.message);
    } finally {
        // Clean up
        const user = await User.findOne({ email: "test@clarity.com" });
        if (user) await Task.deleteMany({ userId: user._id });
        await mongoose.connection.close();
    }
};

runTest();