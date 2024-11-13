import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api`, //  Base URL
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers = [];

const onAccessTokenFetched = (accessToken) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Request Interceptor: Attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle success and error (401, token refresh)
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = Cookies.get("refresh-token");
          const refreshResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/auth/refresh-token`,
            {
              refresh: refreshToken,
            }
          );

          const { access } = refreshResponse.data;
          Cookies.set("token", access);

          isRefreshing = false;
          onAccessTokenFetched(access);

          // Retry the original request with new access token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return axiosInstance(originalRequest); 
        } catch (refreshError) {
          Cookies.remove("token");
          Cookies.remove("refresh-token");

          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      }

      // Queue the requests that fail while token is refreshing
      return new Promise((resolve) => {
        addRefreshSubscriber((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axiosInstance(originalRequest)); 
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
