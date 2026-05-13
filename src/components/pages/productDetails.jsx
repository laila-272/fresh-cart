import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import "../styles/productDetails.css";
export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [wishlistMsg, setWishlistMsg] = useState("");
  const [cartMsg, setCartMsg] = useState("");

  const [addingCart, setAddingCart] = useState(false);
  const [addingWishlist, setAddingWishlist] = useState(false);

  useEffect(() => {
    getProductDetails();
  }, []);

  // GET PRODUCT DETAILS
  const getProductDetails = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  // ADD TO CART
  const addToCart = async (productId) => {
    try {
      setAddingCart(true);

      await api.post("/cart", { productId });

      setCartMsg("Product added to cart!");

      setTimeout(() => {
        setCartMsg("");
      }, 3000);
    } catch (err) {
      console.log(err);

      setCartMsg("Failed to add product to cart");

      setTimeout(() => {
        setCartMsg("");
      }, 3000);
    } finally {
      setAddingCart(false);
    }
  };

  // ADD TO WISHLIST
  const addToWishlist = async (productId) => {
    try {
      setAddingWishlist(true);

      await api.post("/wishlist", { productId });

      setWishlistMsg("Product added to wishlist ❤️");

      setTimeout(() => {
        setWishlistMsg("");
      }, 3000);
    } catch (err) {
      console.log(err);

      setWishlistMsg("Failed to add product to wishlist");

      setTimeout(() => {
        setWishlistMsg("");
      }, 3000);
    } finally {
      setAddingWishlist(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="product-details">

      <h2>{product.title}</h2>

      <img
        src={product.imageCover}
        alt={product.title}
        loading="lazy"
        width="300"
      />

      <p>{product.description}</p>

      <h3>{product.price} EGP</h3>

      {/* messages */}
      {cartMsg && <p className="msg">{cartMsg}</p>}
      {wishlistMsg && <p className="msg">{wishlistMsg}</p>}

      {/* buttons */}
      <button
        onClick={() => addToCart(product._id)}
        disabled={addingCart}
      >
        {addingCart ? "Adding..." : "Add to Cart"}
      </button>

      <button
        onClick={() => addToWishlist(product._id)}
        disabled={addingWishlist}
      >
        {addingWishlist ? "Adding..." : "Add to Wishlist ❤️"}
      </button>
    </div>
  );
}