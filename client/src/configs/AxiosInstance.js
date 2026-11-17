import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "",
    withCredentials: true,

    headers: {
        "Content-Type": "application/json",
    },
});

export default AxiosInstance;