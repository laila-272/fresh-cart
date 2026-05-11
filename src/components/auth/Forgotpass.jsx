import React, { useState } from "react";
import axios from "axios";
import "../styles/app.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
});

export default function Forgotpass() {
  const navigate = useNavigate();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      setError("");
      setSuccess("");

      try {
        const res = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values
        );

        console.log(res.data);

        setSuccess("Reset code sent to your email 📩");

        navigate("/code", {
          state: { email: values.email },
        });

      } catch (error) {
        console.log(error);

        setError(
          error.response?.data?.message ||
            "Something went wrong"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="register-container">
      <span className="register-now">
        Forgot Password
      </span>

      <form
        onSubmit={formik.handleSubmit}
        className="register-form"
      >
        <label>Email:</label>

        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="register-input"
        />

        {formik.touched.email &&
          formik.errors.email && (
            <p className="error-msg">
              {formik.errors.email}
            </p>
          )}

        {error && (
          <p className="error-msg">{error}</p>
        )}

        {success && (
          <p className="success-msg">
            {success}
          </p>
        )}

        <button
          type="submit"
          className="register-btn"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting
            ? "Sending..."
            : "Send Code"}
        </button>
      </form>
    </div>
  );
}