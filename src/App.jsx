import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './components/styles/App.css'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import NavBar from './components/shared/NavBar'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Layout from './components/shared/Layout';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import Brands from './components/pages/Brands';
import Forgotpass from './components/auth/Forgotpass'
import Code from './components/auth/Code';
import ResetPass from './components/auth/resetPass';
import Categories from './components/pages/Categories';
import ProductDetails from './components/pages/productDetails'
import CategoryDetails from './components/pages/categoryDetails';
// import BrandDetails from './components/pages/brandDetails';
import Wishlist from './components/pages/Wishlist';
import Cart from './components/pages/cart';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Register />,
      },
      {path: "home",
      element: <Home />
    },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "brands",
        element: <Brands />,
      },
      {path: "categories",
      element: <Categories />
    },
      {
    path: "/login",
    element: <Login />,
  },
      {
    path: "/forgot-password",
    element: <Forgotpass />,
  },
  {
    path: "/code",
    element: <Code />,
  },
  {
    path: "/resetpassword",
    element: <ResetPass />,
  },
  {
  path: "productDetails/:id",
  element: <ProductDetails />,
},
{
    path: "category/:id",
    element: <CategoryDetails />,
  },
  // {
  //   path: "brand/:id",
  //   element: <BrandDetails />,
  // },
  {
    path: "wishlist",
    element: <Wishlist />,
  },
  {
    path: "cart",
    element: <Cart />,
  }

    ],
  },
  
]);

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
