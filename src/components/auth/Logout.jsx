import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Are you sure you want to logout?</h2>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}