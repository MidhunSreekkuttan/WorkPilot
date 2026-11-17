import axios from "axios";

const baseURL =
    import.meta.env.VITE_NODE_MODE === "development"
        ? import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000"
        : "";

const AxiosInstance = axios.create({
    baseURL,
    withCredentials: true, // CRITICAL: This tells the browser to accept/send cookies
    headers: {
        "Content-Type": "application/json",
    },
});

// Keep your response interceptor for token refreshing, but change how it saves!
AxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest || error.response?.status !== 401) {
            return Promise.reject(error);
        }

        const authEndpoints = [
            "/api/auth/token/",
            "/api/auth/token/refresh/",
            "/api/auth/signup/",
            "/api/auth/google/",
        ];

        const isAuthEndpoint = authEndpoints.some((endpoint) =>
            originalRequest.url?.includes(endpoint)
        );

        if (isAuthEndpoint || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            // Note: Since we use cookies, we don't need to pass the refresh token manually.
            // The browser sends the refresh_token cookie automatically to this endpoint.
            await axios.post(
                `${baseURL}/api/auth/token/refresh/`,
                {},
                { withCredentials: true }
            );

            // Retry original request (browser will automatically use the new access_token cookie)
            return AxiosInstance(originalRequest);

        } catch (refreshError) {
            // If refresh fails, log them out
            localStorage.removeItem("user");
            window.location.href = "/login";
            return Promise.reject(refreshError);
        }
    }
);

export default AxiosInstance;