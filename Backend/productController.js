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