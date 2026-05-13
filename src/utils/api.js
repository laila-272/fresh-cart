import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
});

// request interceptor (بيضيف التوكن تلقائي)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.token = token;
  }

  return config;
});

export default api;