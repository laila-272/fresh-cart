import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../utils/api";
export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getWishlist();
  }, []);

  const getWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/wishlist",
        {
          headers: {
            token: token,
          },
        }
      );

      console.log(res.data);

      setWishlist(res.data.data);

    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Failed to load wishlist"
      );
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.delete(
        `/wishlist/${productId}`,
        {
          headers: {
            token: token,
          },
        }
      );

      console.log(res.data);

      setWishlist((prev) =>
        prev.filter(
          (item) => item._id !== productId
        )
      );

    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (wishlist.length === 0) {
    return <h2>Your wishlist is empty ❤️</h2>;
  }

  return (
    <div className="wishlist-container">
      <h1>My Wishlist ❤️</h1>

      <div className="wishlist-products">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="wishlist-item"
          >
            <img
              src={product.imageCover}
              alt={product.title}
              width="150"
            />

            <h2>{product.title}</h2>

            <p>{product.price} EGP</p>

            <button
              onClick={() =>
                removeFromWishlist(product._id)
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}