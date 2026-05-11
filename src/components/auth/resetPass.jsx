import React, { useState } from "react";
import axios from "axios";
import "../styles/app.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
});

export default function ResetPass() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },

    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      setError("");
      setSuccess("");

      try {
        const res = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          {
            email,
            newPassword: values.newPassword,
          }
        );

        console.log(res.data);

        setSuccess("Password reset successful ✅");

        localStorage.setItem("token", res.data.token);

        navigate("/login");

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
        Reset Password
      </span>

      <form
        onSubmit={formik.handleSubmit}
        className="register-form"
      >
        <label>New Password:</label>

        <input
          name="newPassword"
          type="password"
          placeholder="Enter new password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="register-input"
        />

        {formik.touched.newPassword &&
          formik.errors.newPassword && (
            <p className="error-msg">
              {formik.errors.newPassword}
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
            ? "Resetting..."
            : "Reset Password"}
        </button>
      </form>
    </div>
  );
}