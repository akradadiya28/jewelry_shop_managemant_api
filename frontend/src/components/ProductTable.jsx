import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProducts = async () => {
            try {

                const response = await axios.get(
                    "http://localhost:3026/api/get-products/",
                    {
                        headers: {
                            "authorization": `${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
                console.log("response", response.data.products);
                setProducts(response.data.products);

            } catch (err) {
                setError("Failed to fetch products.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleCreateProduct = () => {
        navigate('/product-form');
    };

    const handleLogout = async () => {
        try {

            await axios.post("http://localhost:3026/api/logout/", null, {
                headers: {
                    "authorization": `${token}`,
                },
            });
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
            alert("An error occurred during logout.");
        }
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center"> Product Table</h2>

            <div className="space-x-4">
                <button
                    onClick={handleCreateProduct}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                    Create Product
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-100 p-4 font-bold text-gray-600">
                    <div className="col-span-2">Name</div>
                    <div className="col-span-1">Type</div>
                    <div className="col-span-1">Carat</div>
                    <div className="col-span-1">Clarity</div>
                    <div className="col-span-1">Color</div>
                    <div className="col-span-1">Cut</div>
                    <div className="col-span-1">Price/Carat</div>
                    <div className="col-span-1">Available</div>
                    <div className="col-span-1">Lab</div>
                    <div className="col-span-1">Final Amount</div>
                </div>

                {products.map((product) => (
                    <div key={product._id} className="md:grid grid-cols-12 gap-4 border-bottom border-gray-200 p-4 flex flex-col md:flex-row">
                        <div className="md:col-span-2 flex items-center mb-2 md:mb-0">
                            <span className="md:hidden font-semibold w-1/3">Name:</span>
                            {product.name}
                        </div>
                        <div className="md:col-span-1 flex items-center mb-2 md:mb-0">
                            <span className="md:hidden font-semibold w-1/3">Type:</span>
                            {product.type}
                        </div>
                        <div className="md:col-span-1 flex items-center mb-2 md:mb-0">
                            <span className="md:hidden font-semibold w-1/3">Carat:</span>
                            {product.carat}
                        </div>
                        <div className="md:col-span-1 flex items-center mb-2 md:mb-0">
                            <span className="md:hidden font-semibold w-1/3">Clarity:</span>
                            {product.clarity}
                        </div>
                        <div className="md:col-span-1 flex items-center mb-2 md:mb-0">
                            <span className="md:hidden font-semibold w-1/3">Color:</span>
                            {product.color}
                        </div>
                        <div className="md:col-span-1 flex items-center mb-2 md:mb-0">
                            <span className="md:hidden font-semibold w-1/3">Cut:</span>
                            {product.cut}
                        </div>
                        <div className="md:col-span-1 flex items-center mb-2 md:mb-0">
                            <span className="md:hidden font-semibold w-1/3">Price/Carat:</span>
                            {product.pricePerCarat} Rs
                        </div>
                        <div className="md:col-span-1 flex items-center mb-2 md:mb-0">
                            <span className="md:hidden font-semibold w-1/3">Available:</span>
                            {product.available ? "Yes" : "No"}
                        </div>
                        <div className="md:col-span-1 flex items-center mb-2 md:mb-0">
                            <span className="md:hidden font-semibold w-1/3">Lab:</span>
                            {product.lab}
                        </div>
                        <div className="md:col-span-1 flex items-center mb-2 md:mb-0">
                            <span className="md:hidden font-semibold w-1/3">Final Amount:</span>
                            {product.finalAmount} Rs
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default ProductTable;
