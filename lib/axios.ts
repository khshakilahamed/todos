import config from "@/config";
import axios from "axios";

// Create a custom axios instance
const axiosInstance = axios.create({
      baseURL: config.baseUrl,
      // withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
      (config) => {
            const token = localStorage.getItem("accessToken");

            if (token) {
                  config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
      },
      (error) => {
            // Handle request error
            return Promise.reject(error);
      }
);

// Response interceptor
axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
            if (error.response) {
                  // Handle 401 Unauthorized
                  if (error.response.status === 401) {
                        console.warn("Unauthorized! Redirecting to login...");
                        // Example: redirect or clear token
                        localStorage.removeItem("accessToken");
                        window.location.href = "/login";
                  }
            }

            /* const responseObject: IGenericErrorResponse = {
                  statusCode: error?.response?.status || 500,
                  message: error?.response?.data?.message || "Something went wrong",
            };
            return Promise.reject(responseObject); */

            return Promise.reject(error);
      }
);

export default axiosInstance;
