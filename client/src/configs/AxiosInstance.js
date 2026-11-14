import axios from 'axios'

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_NODE_MODE === "development" ? import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000" : "",
    headers: {
        "Content-Type": "application/json",
    }
})

export default AxiosInstance