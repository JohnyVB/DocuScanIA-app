import axiosInstance from "../services/axiosService";
import Constants from "expo-constants";

const { apiRegisterUrl } = Constants.expoConfig?.extra || {};

export const onRegisterFeature = async (
    name: string,
    lastname: string,
    email: string,
    password: string,
) => {
    try {
        const { data } = await axiosInstance.post(
            apiRegisterUrl,
            { name, lastname, email, password },
            { headers: { "Content-Type": "application/json" } },
        );
        return data;
    } catch (error) {
        console.error("Register Error:", error);
    }
};
