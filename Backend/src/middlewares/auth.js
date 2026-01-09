import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookie OR Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.split(" ")[1];
      console.log("DEBUG: Token found in request:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 3️⃣ Fetch user with ONLY required fields
    const user = await User.findById(decoded._id).select("_id email");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // 4️⃣ Attach minimal data to req.user
    req.user = {
      id: user._id,
      email: user.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is not valid or expired",
    });
  }
};
