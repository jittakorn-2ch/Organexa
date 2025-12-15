import axios from "axios";
import { keysToCamel, keysToSnake } from "../utils/case";

function getCSRFToken() {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith("csrftoken="))
        ?.split("=")[1];
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const csrfToken = getCSRFToken();
    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
});

api.interceptors.request.use((config) => {
    if (config.data && typeof config.data === "object") {
        config.data = keysToSnake(config.data);
    }
    return config;
});

api.interceptors.response.use((response) => {
    if (response.data && typeof response.data === "object") {
        response.data = keysToCamel(response.data);
    }
    return response;
});


export default api;
