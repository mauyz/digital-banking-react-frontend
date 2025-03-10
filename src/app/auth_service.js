import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const apiClient = () => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8085",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    axiosInstance.interceptors.request.use(
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
    );
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            const { response } = error;
            if (!error.config.url.includes("/auth/login") && response && response.status === 401) {
                localStorage.removeItem('accessToken');
                window.location.href = '/login?error=expired';
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance;
}


export const login = (credentials) => {
    return apiClient().post("/auth/login", credentials);
}

export const logout = () => {
    return localStorage.removeItem("accessToken");
}

export const getProfile = () => {
    return apiClient().get("/auth/profile");
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

export const decodeRoles = (decodedJwt) => {
    if (decodedJwt) {
        return decodedJwt.authorities;
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
