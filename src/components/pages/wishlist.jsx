import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "../styles/wishlist.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    getWishlist();
  }, []);

  // GET WISHLIST
  const getWishlist = async () => {
    try {
      const res = await api.get("/wishlist", {
        headers: { token },
      });

      setWishlist(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // REMOVE / TOGGLE LIKE HEART
  const toggleWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/${productId}`, {
        headers: { token },
      });

      // remove from UI instantly
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  if (wishlist.length === 0) return <h2>Your wishlist is empty ❤️</h2>;

  return (
    <div className="wishlist-container">
      <div className="wishlist-products">
        {wishlist.map((product) => {
          const isWished = true; // هنا كلهم في wishlist أصلاً

          return (
            <div key={product._id} className="wishlist-item">
              <div className="heartbtn">
                <button
                  className="heart-btn"
                  onClick={() => toggleWishlist(product._id)}
                >
                  {isWished ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
              <img src={product.imageCover} alt={product.title} />

              <h2>{product.title}</h2>
              <p>{product.price} EGP</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
