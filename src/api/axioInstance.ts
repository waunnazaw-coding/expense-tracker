import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7028/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g., redirect on 401)
    return Promise.reject(error);
  },
);

export default axiosInstance;
