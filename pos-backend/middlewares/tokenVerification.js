const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/userModel");

const isVerifiedUser = async (req, res, next) => {
    try {
        console.log("Cookies received:", req.cookies); // Debugging

        const { accessToken } = req.cookies;
        if (!accessToken) {
            console.error("❌ No accessToken found in cookies!");
            return next(createHttpError(401, "Please provide token!"));
        }

        const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);
        console.log("✅ Decoded Token:", decodeToken); // Debugging

        const user = await User.findById(decodeToken._id);
        if (!user) {
            console.error("❌ User not found in DB!");
            return next(createHttpError(401, "User does not exist!"));
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("❌ Token verification failed:", error.message);
        next(createHttpError(401, "Invalid Token!"));
    }
};

module.exports = { isVerifiedUser };
