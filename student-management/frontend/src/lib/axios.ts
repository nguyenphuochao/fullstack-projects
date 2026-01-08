import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const api = axios.create({
    baseURL:
        import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api",
    withCredentials: true,
});

// gắn access token vào req header
api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

export default api;