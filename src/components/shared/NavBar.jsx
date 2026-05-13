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

export default function NavBar() {
  return (
    <nav style={styles.nav}>
      {/* Left */}
      <div style={styles.leftSection}>
        <div>
          <img src={logo} alt="FreshCart Logo" style={styles.logoImg} />
        </div>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            Home
          </Link>

          <Link to="/products" style={styles.link}>
            Products
          </Link>

          <Link to="/categories" style={styles.link}>
            Categories
          </Link>

          <Link to="/brands" style={styles.link}>
            Brands
          </Link>
        </div>
      </div>

      {/* Right */}
      <div style={styles.right}>
        <div style={styles.socials}>
          <FaFacebook style={styles.icon} />
          <FaInstagram style={styles.icon} />
          <FaTwitter style={styles.icon} />
          <FaTiktok style={styles.icon} />
          <FaYoutube style={styles.icon} />
        </div>

        <Link to="/login" style={styles.link}>
          Login
        </Link>

        <Link to="/register" style={styles.link}>
          Register
        </Link>
        <Link to="/wishlist" style={styles.link}>
          Wishlist
        </Link>
        <Link to="/cart" style={styles.link}>
          Cart
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    backgroundColor: "#F8F9FA",
    width: "100%",
    flexWrap: "wrap",
  },

  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },

  logoImg: {
    width: "120px",
  },

  links: {
    display: "flex",
    gap: "15px",
  },

  link: {
    color: "#72818C",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  socials: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  icon: {
    color: "#000",
    fontSize: "18px",
    cursor: "pointer",
    transition: "0.3s",
  },
};