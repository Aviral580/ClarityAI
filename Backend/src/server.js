import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';

//import { protect } from '../src/middlewares/auth.js';

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ Connection Error:", err));

app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("❌ Error Stack:", err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));