import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";
import "../styles/productDetails.css";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      toast.success("Product added to cart 🛒");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add product to cart ❌");
    } finally {
      setAddingCart(false);
    }
  };

  // ADD TO WISHLIST
  const addToWishlist = async (productId) => {
    try {
      setAddingWishlist(true);

      await api.post("/wishlist", { productId });

      toast.success("Product added to wishlist ❤️");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add product to wishlist ❌");
    } finally {
      setAddingWishlist(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="product-details">
      <h2>{product.title}</h2>

      <div className="img">
        <img
          src={product.imageCover}
          alt={product.title}
          loading="lazy"
          width="300"
        />
      </div>

      <p>{product.description}</p>

      <h3>{product.price} EGP</h3>

      {/* buttons */}
      <div className="btns">
        <button onClick={() => addToCart(product._id)} disabled={addingCart}>
          {addingCart ? "Adding..." : "Add to Cart"}
        </button>

        <button
          onClick={() => addToWishlist(product._id)}
          disabled={addingWishlist}
        >
          {addingWishlist ? "Adding..." : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}
