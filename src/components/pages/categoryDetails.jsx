import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CategoryDetails() {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategoryDetails();
  }, []);

  const getCategoryDetails = async () => {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}`
      );

      setCategory(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load category");
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
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-6">
        {category.name}
      </h1>

      <img
        src={category.image}
        alt={category.name}
        className="mx-auto w-80 h-80 object-cover rounded-xl shadow-lg"
      />
    </div>
  );
}