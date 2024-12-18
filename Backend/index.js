// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require("./routes/productRoutes");
require('dotenv').config(); // Load environment variables

// Initialize app and set port
const app = express();
const allowedOrigins = ['https://productmanager291.netlify.app/']; // Correct origin without trailing slash

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true, // Allow cookies if needed
})); // Enable CORS for all routes
const PORT = process.env.PORT || 8000;

// Use middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// Use product-related routes
app.use('/', productRoutes);

// Root route - Welcome message
app.get('/', (req, res) => {
    try {
        res.send("Welcome to the Product Management API!");
    } catch (err) {
        // Handle server error
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
