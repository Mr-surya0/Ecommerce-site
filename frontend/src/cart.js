import React from 'react';
import './cart.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate hook

export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();  // To handle navigation after item deletion
  const [cart, setCart] = React.useState(location.state?.cart || []);
  const [quantities, setQuantities] = React.useState({});

  // Function to update the quantity for a specific product
  const updateQuantity = (productId, currentQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: currentQuantity,
    }));
  };

  // Function to remove an item from the cart
  const removeItem = (productId) => {
    // Remove the product from the cart
    const updatedCart = cart.filter((item) => item.product_id !== productId);

    // Remove the product's quantity from quantities state
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[productId];

    // Update the state
    setCart(updatedCart);
    setQuantities(updatedQuantities);

    if (updatedCart.length === 0) {
      navigate('/mainMenu');
    }
  };

  // Calculate total price
  const getTotal = cart.reduce((accumulator, item) => {
    return accumulator + (+item.price) * (quantities[item.product_id] || 1);
  }, 0);

  const tax = getTotal * 0.07;

  return (
    <div>
      <div className="container">
        <a href='/mainMenu' style={{ color: 'black', textDecoration: 'none' }}>
          <ArrowBackIcon />
          <strong style={{ fontSize: '30px' }}> Back</strong>
        </a>
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <i className="fas fa-shopping-cart cart-icon"></i>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.product_id} className="cart-item">
                <img alt={item.name} height="100" src={item.image_url} width="100" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                </div>
                <div className="cart-item-quantity">
                  <input
                    type="number"
                    value={quantities[item.product_id] || 1} 
                    onChange={(e) => updateQuantity(item.product_id, parseInt(e.target.value, 10))}
                    min="1" 
                  />
                </div>
                <div className="cart-item-remove">
                  <i className="fas fa-trash" onClick={() => removeItem(item.product_id)}></i>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <p>Subtotal: ${getTotal.toFixed(2)}</p>
          <p>Tax: ${tax.toFixed(2)}</p>
          <p className="total-price">Total: ${(getTotal + tax).toFixed(2)}</p>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
