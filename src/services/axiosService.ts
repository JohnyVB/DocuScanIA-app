import axios from "axios";
import Constants from "expo-constants";

const { apiBaseUrl } = Constants.expoConfig?.extra || {};

const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 20000,
    headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
