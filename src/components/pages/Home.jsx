import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products",
        {
          // params: {
          //   sort: "-price",
           
          //   "price[gte]": 100,
          //   page: 1,
          // },
        },
      );

      console.log(res.data);
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
   <div className="products-container">
  {products.map((product) => (
    <div className="product-card" key={product._id}>
      <img src={product.imageCover} alt={product.title} />

      <h5>{product.category.name}</h5>
      <h3>{product.brand.name}</h3>
     <div className="flex justify-between items-center"> <p>{product.price} EGP</p>
      <p>{product.ratingsAverage}</p></div>
    </div>
  ))}
</div>
  );
}
