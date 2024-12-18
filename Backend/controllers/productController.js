//in memory to store products
let products = [
    {
        "id": "1",
        "name": "Laptop",
        "price": "1000",
        "category": "Electronics"
    },
    {
        "id": "2",
        "name": "Shoes",
        "price": "50",
        "category": "Fashion"
    },
    {
        "id": "3",
        "name": "Watch",
        "price": "200",
        "category": "Accessories"
    },
];
let currerntId = 4;
const generateId = () => {
    return currerntId++;
}

exports.getProducts = (req, res) => {
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
}

exports.postProduct = (req, res) => {
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
}

exports.deleteProduct = (req, res) => {
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
}