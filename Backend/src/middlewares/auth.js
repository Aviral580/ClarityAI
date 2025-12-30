import jwt from 'jsonwebtoken';
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'No token, authorization denied' 
            });
        }

        // 2. Verify the token using your Secret Key
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // 3. Find the user and attach to the request
        // Using .select("-password") ensures sensitive data isn't passed around
        const user = await User.findById(decoded?._id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'User no longer exists' 
            });
        }

        req.user = user; 
        next();
    } catch (err) {
        return res.status(401).json({ 
            success: false, 
            message: 'Token is not valid or expired' 
        });
    }
};