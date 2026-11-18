import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "/api",
    withCredentials: true,

    headers: {
        "Content-Type": "application/json",
    },
});

// Separate instance to avoid interceptor recursion
const RefreshInstance = axios.create({
    baseURL: "/api",
    withCredentials: true,
    headers: { "Content-Type": "application/json", }
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error)
        } else {
            promise.resolve()
        }
    })
    failedQueue = []
}

AxiosInstance.interceptors.response.use((response) => response, async (error) => {

    const originalRequest = error.config

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry ||
        originalRequest.url?.includes("/auth/token/refresh/")) {
        return Promise.reject(error)
    }

    originalRequest._retry = true

    // If refresh is already running, wait for it
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            failedQueue.push({
                resolve: () => resolve(AxiosInstance(originalRequest)),
                reject
            })
        })
    }

    isRefreshing = true

    try {

        await RefreshInstance.post("/auth/token/refresh/")
        // Refresh cookie is updated by Django.
        // Retry original request.
        processQueue(null)
        return AxiosInstance(originalRequest)

    } catch (refreshError) {
        processQueue(refreshError)
        // Notify your authentication state manager
        window.dispatchEvent(
            new Event("auth:session-expired")
        )

        return Promise.reject(refreshError)
    }

    finally {
        isRefreshing = false
    }

})

export default AxiosInstance;