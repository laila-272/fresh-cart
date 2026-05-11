import React, { useState } from "react";
import axios from "axios";
import "../styles/app.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      setError("");

      try {
        const res = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );

        console.log(res.data);

        localStorage.setItem("token", res.data.token);

        navigate("/home");
      } catch (error) {
        console.log(error);

        setError(
          error.response?.data?.message || "Login failed"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div style={{marginTop:"60px"}} className="register-container">
      <span className="register-now">Login now:</span>

      <form onSubmit={formik.handleSubmit} className="register-form">

        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="register-input"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="error-msg">{formik.errors.email}</p>
        )}

        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="register-input"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="error-msg">{formik.errors.password}</p>
        )}

        {error && <p className="error-msg">{error}</p>}

        <div className="btn-container">
          <div className="options">
           <span className="login-link"
              onClick={() => navigate("/forgot-password")}>forgot password?</span>
            <span
              className="login-link"
              onClick={() => navigate("/register")}
            >
              sign up
            </span>

          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}