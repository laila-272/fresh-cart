import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./components/styles/App.css";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Layout from "./components/shared/Layout";

import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import Brands from "./components/pages/Brands";
import Forgotpass from "./components/auth/Forgotpass";
import Code from "./components/auth/Code";
import ResetPass from "./components/auth/resetPass";
import Categories from "./components/pages/Categories";
import ProductDetails from "./components/pages/productDetails";
import CategoryDetails from "./components/pages/categoryDetails";
import Wishlist from "./components/pages/Wishlist";
import Cart from "./components/pages/cart";

import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Register /> },

      { path: "home", element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "products", element: <Products /> },
      { path: "brands", element: <Brands /> },
      { path: "categories", element: <Categories /> },

      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <Forgotpass /> },
      { path: "code", element: <Code /> },
      { path: "resetpassword", element: <ResetPass /> },

      { path: "productDetails/:id", element: <ProductDetails /> },
      { path: "category/:id", element: <CategoryDetails /> },

      { path: "wishlist", element: <Wishlist /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />

      {/* ⭐ مهم جدًا: ده اللي بيخلي toast يظهر */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
