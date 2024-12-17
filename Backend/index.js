// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require("./routes/productRoutes");
require('dotenv').config(); // Load environment variables

// Initialize app and set port
const app = express();
const PORT = process.env.PORT || 8000;

// Use middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all routes

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
