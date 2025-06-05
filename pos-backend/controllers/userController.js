const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const register = async (req, res, next) => {
    try {
        const { name, phone, email, password, role } = req.body;

        if(!name || !phone || !email || !password || !role){
            const error = createHttpError(400, "All fields are required!");
            return next(error);
        }

        const isUserPresent = await User.findOne({email});
        if(isUserPresent){
            const error = createHttpError(400, "User already exist!");
            return next(error);
        }

        const user = { name, phone, email, password, role };
        const newUser = User(user);
        await newUser.save();

        res.status(201).json({success: true, message: "New user created!", data: newUser});
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if(!email || !password) {
            const error = createHttpError(400, "Email and password are required!");
            return next(error);
        }

        // Find user and explicitly select password field
        const user = await User.findOne({ email }).select('+password');
        if(!user){
            const error = createHttpError(401, "Invalid email or password");
            return next(error);
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            const error = createHttpError(401, "Invalid email or password");
            return next(error);
        }

        // Generate token
        const accessToken = jwt.sign(
            { _id: user._id },
            config.accessTokenSecret,
            { expiresIn: '1d' }
        );

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        // Set cookie
        res.cookie('accessToken', accessToken, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });

        // Send response
        res.status(200).json({
            success: true,
            message: "Login successful!",
            data: userResponse
        });

    } catch (error) {
        console.error("Login error:", error);
        next(error);
    }
}

const getUserData = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            const error = createHttpError(404, "User not found");
            return next(error);
        }
        res.status(200).json({success: true, data: user});
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });
        res.status(200).json({success: true, message: "Logout successful!"});
    } catch (error) {
        next(error);
    }
}

module.exports = { register, login, getUserData, logout }
