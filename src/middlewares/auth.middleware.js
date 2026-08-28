const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
    try {
        // Get Authorization header
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        // Check Bearer format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format",
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify access token
        const decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        );

        // Find user
        const user = await User.findById(decoded.userId);

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists",
            });
        }

        // Attach user to request
        req.user = user;

        // Continue to next middleware/controller
        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token",
        });
    }
};

module.exports = {
    authenticate,
};