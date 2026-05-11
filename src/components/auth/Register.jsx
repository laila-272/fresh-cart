import React from "react";
import axios from "axios";
import "../styles/app.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone")
    .required("Phone is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );

        localStorage.setItem("token", res.data.token);
        navigate("/login");
      } catch (error) {
  console.log(error);

  setError(
    error.response?.data?.message || "User already exists"
  );
}
    },
  });

  return (
    <div className="register-container">
      <span className="register-now">Register now:</span>

      <form onSubmit={formik.handleSubmit} className="register-form">

        <label>Name:</label>
        <input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="register-input"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="error-msg">{formik.errors.name}</p>
        )}

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

        <label>Phone:</label>
        <input
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="register-input"
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="error-msg">{formik.errors.phone}</p>
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

        <label>Re Password:</label>
        <input
          name="rePassword"
          type="password"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="register-input"
        />
        {formik.touched.rePassword && formik.errors.rePassword && (
          <p className="error-msg">{formik.errors.rePassword}</p>
        )}

        <div className="btn-container">
          <div className="logged">
            Already have an account?{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}