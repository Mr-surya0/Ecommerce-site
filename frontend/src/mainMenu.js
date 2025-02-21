import React, { useState, useEffect } from "react";
import Header from './header.js';
import Footer from './footer.js';
import ProductList from './productList.js';
import SearchBar from './searchBar.js';
import axios from 'axios';
import './mainMenu.css'

export default function MainMenu() {
    const [searchTerm, setSearchTerm] = useState('');  // Search term
    const [cart, setCart] = useState([]);  // Cart state
    const [allProducts, setAllProducts] = useState([]);  // Store all products
    const [filteredProducts, setFilteredProducts] = useState([]);  // Store filtered products
    const [sortOrder, setSortOrder] = useState('');  // Sort order (low to high or high to low)

    const addToCart = (product) => {
        setCart(prevCart => [...prevCart, product]);
        alert(`${product.name} added to cart!`);
    };

    // Fetch all products 
    useEffect(() => {
        axios.get('http://34.201.65.150:5000/products')
            .then((response) => {
                setAllProducts(response.data.products);
                setFilteredProducts(response.data.products);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    // Search handler to filter products
    const handleSearch = (query) => {
        setSearchTerm(query);  // Update the search term
        if (!query) {
            setFilteredProducts(allProducts);
        } else {
            // Filter the products based on search query (case insensitive)
            const filtered = allProducts.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.category_name.toLowerCase().includes(query.toLowerCase()) ||
                product.category_description.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);  // Update the filtered products
        }
    };

    // Sort handler to sort products by price
    const handleSort = (order) => {
        setSortOrder(order);
        const sortedProducts = [...filteredProducts];
        if (order === 'lowToHigh') {
            sortedProducts.sort((a, b) => a.price - b.price);  // Sort from low to high
        } else if (order === 'highToLow') {
            sortedProducts.sort((a, b) => b.price - a.price);  // Sort from high to low
        }
        setFilteredProducts(sortedProducts);  // Update the filtered products with sorted list
    };

    return (
        <div>
            <Header cart={cart} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />

            <div className="sort-options">
                <button onClick={() => handleSort('lowToHigh')}>Price: Low to High</button>
                <button onClick={() => handleSort('highToLow')}>Price: High to Low</button>
            </div>

            <ProductList products={filteredProducts} addToCart={addToCart} />
            <Footer />
        </div>
    );
}
