import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import productDetails from './productDetails'
export default function Products() {
const [products, setProducts] = useState([]);
const navigate = useNavigate();
  const getProducts = async () => {
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
    <div className="product-card" key={product._id}   onClick={() => navigate(`/productDetails/${product._id}`)}
 style={{ cursor: "pointer" }}>
      <img src={product.imageCover} alt={product.title} />

      <h5>{product.category.name}</h5>
      <h3>{product.brand.name}</h3>
     <div className="flex justify-between items-center"> <p>{product.price} EGP</p>
      <p>{product.ratingsAverage}</p></div>
    </div>
  ))}
</div>
  )
}
