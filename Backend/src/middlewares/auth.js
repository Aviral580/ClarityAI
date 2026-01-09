import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        // 1. Get token from header or cookie
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }

        // 2. Decode token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // 3. Find user in DB (Critical: Exclude password/refresh token)
        const user = await User.findById(decodedToken?._id || decodedToken?.id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token: User not found");
        }

        // 4. Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});