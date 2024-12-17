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
        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products
        });
    }catch(err) {
        console.log(err);
        res.status(500)
            .json({
                success: false,
                message: "Internal server error"
            })
    }
})

app.get("/", (req, res) => {
    res.send("Welcome to Product Manager!");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})