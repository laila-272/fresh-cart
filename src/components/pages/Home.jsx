import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ================= PRODUCTS =================
  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= WISHLIST =================
  const getWishlist = async () => {
    try {
      const res = await api.get("/wishlist", {
        headers: { token },
      });

      const ids = res.data.data.map((item) => item._id);
      setWishlist(ids);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      const isWished = wishlist.includes(productId);

      if (isWished) {
        await api.delete(`/wishlist/${productId}`, {
          headers: { token },
        });

        setWishlist((prev) => prev.filter((id) => id !== productId));
      } else {
        await api.post(
          "/wishlist",
          { productId },
          {
            headers: { token },
          },
        );

        setWishlist((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= CART =================
  const addToCart = async (productId) => {
    try {
      const res = await api.post(
        "/cart",
        { productId },
        {
          headers: { token },
        },
      );

      console.log("Added to cart:", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    getProducts();
    getWishlist();
  }, []);

  // ================= UI =================
  return (
    <div className="products-container">
      {products.map((product) => {
        const isWished = wishlist.includes(product._id);

        return (
          <div
            key={product._id}
            className="product-card"
            onClick={() => navigate(`/productDetails/${product._id}`)}
            style={{
              cursor: "pointer",
              position: "relative",
            }}
          >
            {/* IMAGE */}
            <img src={product.imageCover} alt={product.title} />

            {/* ICONS */}
            <div className="icons">
              {/* WISHLIST */}
              <span
                className="icon heart"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product._id);
                }}
              >
                {isWished ? <FaHeart /> : <FaRegHeart />}
              </span>

              {/* CART */}
              <span
                className="icon cart"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product._id);
                }}
              >
                <FaShoppingCart />
              </span>
            </div>

            {/* INFO */}
            <h5>{product.category.name}</h5>
            <h3>{product.brand.name}</h3>

            <div className="flex justify-between items-center">
              <p>{product.price} EGP</p>
              <p>{product.ratingsAverage}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
