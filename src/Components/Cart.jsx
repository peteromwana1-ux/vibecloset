import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Update quantity
  const updateQuantity = (id, change) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id || item.product_id === id) {
        const newQty = (item.quantity || 1) + change;
        return { ...item, quantity: newQty > 1 ? newQty : 1 };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => 
      item.id !== id && item.product_id !== id
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate Total (Works with both old and new products)
  const total = cart.reduce((sum, item) => {
    const price = item.price ? item.price * 130 : item.product_cost || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  return (
    <div className="cart-page">
      <div className="cart-card card shadow m-4 p-4">
        <h1 className="text-center mb-4">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty. Start shopping!</p>
        ) : (
        <>
          {cart.map((item) => {
            const price = item.price ? Math.round(item.price * 130) : item.product_cost || 0;
            const image = item.thumbnail || item.images?.[0] || 
                         `https://peterson.alwaysdata.net/static/images/${item.product_photo}`;

            return (
              <div key={item.id || item.product_id} className="cart-item">
                <img
                  src={image}
                  alt={item.title || item.product_name}
                  style={{ width: "180px", height: "180px", objectFit: "cover", borderRadius: "12px" }}
                />

                <div className="cart-details">
                  <h4>{item.title || item.product_name}</h4>
                  <p>Price: KSH {price}</p>

                  {/* Quantity Controls */}
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id || item.product_id, -1)}>-</button>
                    <span style={{ margin: "0 15px", fontSize: "1.1rem" }}>
                      {item.quantity || 1}
                    </span>
                    <button onClick={() => updateQuantity(item.id || item.product_id, 1)}>+</button>
                  </div>

                  {/* Subtotal */}
                  <p>
                    <strong>Subtotal:</strong> KSH {price * (item.quantity || 1)}
                  </p>

                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id || item.product_id)}
                  >
                    Remove
                  </button>
                </div>

                <hr />
              </div>
            );
          })}

          {/* Grand Total */}
          <div className="text-end my-4">
            <h2>Total: KSH {total}</h2>
          </div>

          {/* Checkout Button */}
          <button
            className="buy-btn w-100 py-3"
            onClick={() => {
              navigate("/makepayment", {
                state: { 
                  total, 
                  cartItems: cart 
                },
              });
            }}
          >
            Proceed to Checkout
          </button>
        </>
        )}
      </div>
    </div>
  );
}

export default Cart;