import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getCategories = async () => {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );

      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Categories
      </h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
              onClick={() => navigate(`/category/${category._id}`)}
            key={category._id}
            className="border rounded-xl shadow-md p-4 hover:shadow-xl transition duration-300"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-52 object-cover rounded-lg"
            />

            <h2 className="text-xl font-semibold text-center mt-4">
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}