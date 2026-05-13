import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

export default function BrandDetails() {
  const { id } = useParams();

  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getBrandDetails();
  }, []);

  const getBrandDetails = async () => {
    try {
      const res = await api.get(
        `/brands/${id}`
      );

      setBrand(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load brand");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 text-xl">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-bold mb-6">
        {brand.name}
      </h1>

      <img
        src={brand.image}
        alt={brand.name}
        className="mx-auto w-80 h-80 object-contain shadow-lg rounded-xl"
      />
    </div>
  );
}