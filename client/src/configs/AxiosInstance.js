import axios from 'axios'

const baseURL = import.meta.env.VITE_NODE_MODE === "development" ? import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000" : ""

const AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    }
})

AxiosInstance.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refresh_token")
        if (refreshToken) {
            try {

                const { data } = await axios.post(`${baseURL}/api/auth/token/refresh/`, {
                    refresh: refreshToken
                })

                localStorage.setItem("access_token", data.access)
                if (data.refresh) {
                    localStorage.setItem("refresh_token", data.refresh)
                }

                originalRequest.headers.Authorization = `Bearer ${data.access}`

                return AxiosInstance(originalRequest);

            } catch (error) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user');
                window.location.href = "/login"
                return Promise.reject(error)
            }
        }
    }

    return Promise.reject(error)
})

export default AxiosInstance