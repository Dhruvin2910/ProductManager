const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//initialized app and middleware
const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

//in memory to store products
let products = [];
let currentId = 1; //initialized the starting ID


const { v4: uuidv4 } = require('uuid');
const generateId = () => uuidv4(); // to generate unique id for each product


// --- Routes ---

// 1. GET /products - Retrieve all products
app.get('/products', (req, res) => {
    try{
        // Return all products with a success response
        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products
        });
    }catch(err) {
         // Catch any unexpected server errors
        console.log(err); // Log the error for debugging
        res.status(500)
            .json({
                success: false,
                message: "Internal server error"
            })
    }
})

// 2. POST /products - Add a new product
app.post('/products', (req, res) => {
    try{
        const { name, price, category } = req.body;

        //Input validation
        if(!name || !price || !category){
            return res.status(400).json({
                success:false,
                message:'Incomplete details!'
            })
        }

        //price validation
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid price!'
            });
        }
        
        //create new product with generated ID
        const newProduct = {
            id: generateId(),
            name,
            price,
            category
        }

        //Add the new product to in-memory array
        products.push(newProduct);

        //return success response
        return res.status(201).json({
            success:true,
            message:'Product added successfully',
            data:newProduct
        })
    }catch(err){
         // Catch any unexpected server errors
         console.log(err); // Log the error for debugging
         res.status(500)
             .json({
                 success: false,
                 message: "Internal server error"
             })
    }
})

// 3. DELETE /products/:id - Delete a product by ID
app.delete('/products/:id', (req, res) => {
    try{
        const { id } = req.params;

        //find product by indexby id
        const productIndex = products.findIndex((product) => product.id === id);

        if(productIndex === -1){
            //product not found, return error
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }

        //remove the product from the array
        const deletedProduct = products.splice(productIndex, 1);

        //return success response with deleted products
        res.status(200).json({
            success:true,
            message:"Product deleted successfully",
            data:deletedProduct[0]
        });
    }catch(err){
         // Catch any unexpected server errors
         console.log(err); // Log the error for debugging
         res.status(500)
             .json({
                 success: false,
                 message: "Internal server error"
             })
    }
})

app.get('/', (req, res) => {
    try {
        res.send("Welcome to the Product Management API!");
    } catch (err) {
        // Catch any unexpected server errors
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})