import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import BrandDetails from "./BrandDetails";
export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getBrands() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );

      setBrands(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
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
      <h1 className="text-3xl font-bold mb-8 text-center">Brands</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            onClick={() => navigate(`/brand/${brand._id}`)}
            key={brand._id}
            className="border rounded-xl shadow-md p-4 hover:shadow-xl transition duration-300"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-48 object-contain mb-4"
            />

            <h2 className="text-xl font-semibold text-center">
              {brand.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}