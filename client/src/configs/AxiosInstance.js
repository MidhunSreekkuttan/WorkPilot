
import axios from "axios";

const baseURL =
    import.meta.env.VITE_NODE_MODE === "development"
        ? import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000"
        : "";

const AxiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ========================================
// REQUEST INTERCEPTOR
// Attach access token to every API request
// ========================================

AxiosInstance.interceptors.request.use(
    (config) => {

        const isAuthRequest = [
            "/api/auth/token/",
            "/api/auth/token/refresh/",
            "/api/auth/signup/",
            "/api/auth/google/",
        ].some(endpoint => config.url?.includes(endpoint));

        if (isAuthRequest) {
            delete config.headers.Authorization;
            return config;
        }

        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            delete config.headers.Authorization;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ========================================
// RESPONSE INTERCEPTOR
// Refresh expired access token
// ========================================

AxiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest || error.response?.status !== 401) {
            return Promise.reject(error);
        }

        // Do not refresh tokens for authentication endpoints.
        const authEndpoints = [
            "/api/auth/token/",
            "/api/auth/token/refresh/",
            "/api/auth/signup/",
            "/api/auth/google/",
        ];

        const isAuthEndpoint = authEndpoints.some(
            (endpoint) => originalRequest.url?.includes(endpoint)
        );

        if (isAuthEndpoint || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");

            window.location.href = "/login";

            return Promise.reject(error);
        }

        try {
            const { data } = await axios.post(
                `${baseURL}/api/auth/token/refresh/`,
                {
                    refresh: refreshToken,
                }
            );

            // Store the new access token.
            localStorage.setItem("access_token", data.access);

            // Store rotated refresh token if provided.
            if (data.refresh) {
                localStorage.setItem("refresh_token", data.refresh);
            }

            // Retry original request with new access token.
            originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${data.access}`,
            };

            return AxiosInstance(originalRequest);

        } catch (refreshError) {

            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");

            window.location.href = "/login";

            return Promise.reject(refreshError);
        }
    }
);

export default AxiosInstance;