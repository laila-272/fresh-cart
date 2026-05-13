import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "../styles/cart.css";
export default function cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCart();
  }, []);

  // GET CART
  const getCart = async () => {
    try {
      const res = await api.get("/cart");

      setCart(res.data.data);
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
          "Failed to load cart"
      );
    } finally {
      setLoading(false);
    }
  };

  // CLEAR CART
  const clearCart = async () => {
    try {
      const res = await api.delete("/cart");

      console.log(res.data);

      setCart(null);
    } catch (err) {
      console.log(err);
    }
  };

  // REMOVE ITEM
  const removeItem = async (productId) => {
    try {
      const res = await api.delete(
        `/cart/${productId}`
      );

      setCart(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE QUANTITY
  const updateCount = async (productId, newCount) => {
    try {
      if (newCount < 1) return;

      const res = await api.put(
        `/cart/${productId}`,
        {
          count: newCount,
        }
      );

      setCart(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  if (!cart || cart?.products.length === 0) {
    return <h2>Your cart is empty 🛒</h2>;
  }

  return (
    <div className="cart-container">
      <h1>My Cart</h1>

      <h3>
        Total Price: {cart.totalCartPrice} EGP
      </h3>

      <button onClick={clearCart}>
        Clear Cart
      </button>

      <div className="cart-products">
        {cart?.products.map((item) => (
          <div
            key={item.product._id}
            className="cart-item"
          >
            <img
              src={item.product.imageCover}
              alt={item.product.title}
              width="150"
            />

            <h2>{item.product.title}</h2>

            <p>Price: {item.price} EGP</p>

            <p>Quantity: {item.count}</p>

            <button
              onClick={() =>
                removeItem(item.product._id)
              }
            >
              Remove
            </button>

            <div className="quantity-buttons">
              <button
                onClick={() =>
                  updateCount(
                    item.product._id,
                    item.count - 1
                  )
                }
              >
                -
              </button>

              <span>{item.count}</span>

              <button
                onClick={() =>
                  updateCount(
                    item.product._id,
                    item.count + 1
                  )
                }
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}