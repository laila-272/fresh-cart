import React, { useState } from "react";
import axios from "axios";
import "../styles/app.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  resetCode: yup
    .string()
    .required("Code is required"),
});

export default function Code() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },

    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      setError("");
      setSuccess("");

      try {
        const res = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values
        );

        console.log(res.data);

        setSuccess("Code verified successfully ✅");

        navigate("/resetpassword", {
          state: { email },
        });

      } catch (error) {
        console.log(error);

        setError(
          error.response?.data?.message ||
            "Invalid code"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="register-container">
      <span className="register-now">
        Verify Code
      </span>

      <form
        onSubmit={formik.handleSubmit}
        className="register-form"
      >
        <label>Reset Code:</label>

        <input
          name="resetCode"
          type="text"
          placeholder="Enter reset code"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="register-input"
        />

        {formik.touched.resetCode &&
          formik.errors.resetCode && (
            <p className="error-msg">
              {formik.errors.resetCode}
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
            ? "Checking..."
            : "Verify Code"}
        </button>
      </form>
    </div>
  );
}