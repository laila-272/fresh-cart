import React, { useState } from "react";
import axios from "axios";
import "../styles/app.css";
import { useNavigate } from "react-router-dom";
// import Home from "./Home";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
    const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        {
          email,
          password,
        }
      );

      console.log(res.data);

      setSuccess("Login successful 🎉");

      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      {success && <p className="success-msg">{success}</p>}
    </div>
  );
}