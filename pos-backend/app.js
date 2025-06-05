const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const PORT = config.port;
connectDB();

// CORS Configuration
app.use(cors({
    // Allow both localhost and IP address access
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if(!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            // Get the IP address dynamically
            origin
        ];
        
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Credentials',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers'
    ]
}));

// Enable pre-flight for all routes
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

// Root Endpoint
app.get("/", (req,res) => {
    res.json({message : "Hello from POS Server!"});
})

// Other Endpoints
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));

// Global Error Handler
app.use(globalErrorHandler);

// Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`☑️  POS Server is listening on port ${PORT}`);
})
