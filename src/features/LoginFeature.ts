import axiosInstance from "../services/axiosService";
import Constants from "expo-constants";

const { apiLoginUrl } = Constants.expoConfig?.extra || {};

export const onLoginFeature = async (email: string, password: string) => {
    try {
        const { data } = await axiosInstance.post(
            apiLoginUrl,
            { email, password },
            { headers: { "Content-Type": "application/json" } },
        );
        return data;
    } catch (error) {
        console.error("Login Error:", error);
    }
};
