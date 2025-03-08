import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

export const logout = () => {
    return localStorage.removeItem("accessToken");
}

export const decodeJwt = (token) => {
    if (token != null) {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error('Error decoding JWT:', error);
        }
    }
    else {
        return null;
    }
}

export const decodeRole = (decodedJwt) => {
    if (decodedJwt) {
        return decodedJwt.scope.split(" ");
    }
    else {
        return null;
    }
}

export const decodeUsername = (decodedJwt) => {
    if (decodedJwt) {
        return decodedJwt.sub;
    }
    else {
        return null;
    }
}
