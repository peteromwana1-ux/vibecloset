import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


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
      if (item.product_id === id) {
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
    const updatedCart = cart.filter((item) => item.product_id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.product_cost * (item.quantity || 1),
    0
  );

  return (
    <div className="container">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.product_id} className="cart-item">
              <h4>{item.product_name}</h4>
              <p>Price: $ {item.product_cost}</p>

              {/* Quantity controls */}
              <div>
                <button onClick={() => updateQuantity(item.product_id, -1)}>
                  -
                </button>

                <span style={{ margin: "0 10px" }}>
                  {item.quantity || 1}
                </span>

                <button onClick={() => updateQuantity(item.product_id, 1)}>
                  +
                </button>
              </div>

              {/* Subtotal */}
              <p>
                Subtotal: $
                {item.product_cost * (item.quantity || 1)}
              </p>

              <button onClick={() => removeItem(item.product_id)}>
                Remove
              </button>

              <hr />
            </div>
          ))}

       {/* Total */}
<h2>Total: $ {total}</h2>

<button
  className="buy-btn"
 onClick={() =>
                navigate("/makepayment", { state: { total } })
              }
>
  Proceed to Checkout
</button>
        </>
      )}
    </div>
  );
}

export default Cart;