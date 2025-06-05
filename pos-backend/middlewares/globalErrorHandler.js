const config = require("../config/config");

const globalErrorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error status and message
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Send error response
    res.status(status).json({
        success: false,
        message: message,
        error: process.env.NODE_ENV === 'development' ? err : undefined
    });
};

module.exports = globalErrorHandler;