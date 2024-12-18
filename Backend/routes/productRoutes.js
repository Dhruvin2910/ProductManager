// Import necessary modules
const express = require('express');
const router = express.Router(); // Create a new router instance

// Import product controller functions
const productController = require("../controllers/productController");

// Define routes for handling product-related requests
router.get("/product", productController.getProducts); // Get all products
router.post("/product", productController.postProduct); // Add a new product
router.delete("/product/:id", productController.deleteProduct); // Delete a product by ID

// Export the router to be used in other files
module.exports = router;
