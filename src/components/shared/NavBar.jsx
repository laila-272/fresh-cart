import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

import logo from "../../assets/E-Commerce assets/images/freshcart-logo.svg";
import "../styles/app.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      {/* Left */}
      <div className="leftSection">
        <div>
          <img src={logo} alt="FreshCart Logo" className="logoImg" />
        </div>

        <div className="links">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/products" className="link">
            Products
          </Link>
          <Link to="/categories" className="link">
            Categories
          </Link>
          <Link to="/brands" className="link">
            Brands
          </Link>
        </div>
      </div>

      {/* Right */}
      <div className="right">
        <div className="socials">
          <FaFacebook className="icon" />
          <FaInstagram className="icon" />
          <FaTwitter className="icon" />
          <FaTiktok className="icon" />
          <FaYoutube className="icon" />
        </div>

        <Link to="/login" className="link">
          Login
        </Link>
        <Link to="/register" className="link">
          Register
        </Link>
        <Link to="/wishlist" className="link">
          Wishlist
        </Link>
        <Link to="/cart" className="link">
          Cart
        </Link>
      </div>
    </nav>
  );
}
