import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import the required CSS

function App() {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility

  // Fetch products function
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://productmanager-2k7p.onrender.com/product");
      console.log("Fetched products:", response.data); // Debugging log
      setProducts(response.data.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products!"); // Show error toast
    }
  };

  // Delete product function
  const deleteProduct = async (productId) => {
    try {
      // Send the delete request to the backend
      await axios.delete(`https://productmanager-2k7p.onrender.com/product/${productId}`);
  
      // Fetch the updated product list from the backend
      fetchProducts(); // Ensure you re-fetch the products after deletion
      toast.success("Product deleted successfully!"); // Show success toast
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product!"); // Show error toast
    }
  };
  

  // Add product function
  const addProduct = async () => {
    try {
      const response = await axios.post("https://productmanager-2k7p.onrender.com/product", newProduct);
      console.log("Added product:", response.data);
      fetchProducts(); // Fetch products again after adding new product
      setNewProduct({ name: "", price: "", category: "" }); // Reset input fields
      toast.success("Product added successfully!"); // Show success toast
      setShowModal(false); // Close modal after adding product
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("Failed to add product!"); // Show error toast
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="bg-gray-100 h-screen flex flex-col items-center justify-start py-10"> 
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 w-full max-w-4xl"> 
          <h1 className="text-3xl font-semibold text-blue-700 text-center">
            Product List
          </h1>
          <div className="flex justify-end">
            <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 mt-4 md:mt-0" > 
              Add Product 
            </button> 
          </div>
        </div>

        {/* Product List */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 relative"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600">Price: ${product.price}</p>
                <p className="text-gray-600">Category: {product.category}</p>
              </div>
              <button
                onClick={() => deleteProduct(product.id)}
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding Product */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={addProduct}
                className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast container to display the notifications */}
      <ToastContainer />
    </>
  );
}

export default App;
