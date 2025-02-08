import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || "https://codesk-vy7w.onrender.com",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
