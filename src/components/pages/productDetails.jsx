import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      const res = await api.get(
        `/products/${id}`
      );

      setProduct(res.data.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <img src={product.imageCover} alt={product.title} loading="lazy" />
      <p>{product.description}</p>
      <h3>{product.price} EGP</h3>
    </div>
  );
}