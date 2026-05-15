import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

export default function CategoryDetails() {
  const { id } = useParams();

  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getSubcategories();
  }, [id]);

  const getSubcategories = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/categories/${id}/subcategories`);

      setSubcategories(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load subcategories");
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
    return <div className="text-center text-red-500 text-xl">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Subcategories</h1>

      {subcategories.length === 0 ? (
        <p className="text-center text-gray-500">No subcategories found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {subcategories.map((sub) => (
            <div
              key={sub._id}
              className="shadow-lg rounded-xl overflow-hidden bg-white"
            >
              <img
                src={sub.image}
                alt={sub.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold">{sub.name}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
