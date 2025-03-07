import axios from "axios";

export const bankingAPI = axios.create({
    baseURL: "http://localhost:8085",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})

bankingAPI.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && !config.url.includes("/auth/login")) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const login = (credentials) => {
    return bankingAPI.post("/auth/login", credentials);
}