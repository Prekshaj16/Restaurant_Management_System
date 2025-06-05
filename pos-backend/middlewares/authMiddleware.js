const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const User = require("../models/userModel");
const config = require("../config/config");

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if(!token){
            const error = createHttpError(401, "Please login to continue!");
            return next(error);
        }

        const decoded = jwt.verify(token, config.accessTokenSecret);
        const user = await User.findById(decoded._id);
        if(!user){
            const error = createHttpError(401, "User not found!");
            return next(error);
        }

        req.user = user;
        next();
    } catch (error) {
        if(error.name === "JsonWebTokenError"){
            const error = createHttpError(401, "Invalid token!");
            return next(error);
        }
        if(error.name === "TokenExpiredError"){
            const error = createHttpError(401, "Token expired!");
            return next(error);
        }
        next(error);
    }
}

module.exports = { protect }; 