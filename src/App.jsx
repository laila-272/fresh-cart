import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './components/styles/App.css'
import Register from './components/auth/register'
import Login from './components/auth/Login'
import NavBar from './components/shared/NavBar'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Layout from './components/shared/Layout';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import Brands from './components/pages/Brands';
import Categories from './components/pages/Categories';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
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
