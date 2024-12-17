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


const generateId = () => {
    return currentId++; //return the current id and increment it
}

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
        return res.status(200).json({
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