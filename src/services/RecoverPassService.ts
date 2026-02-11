import axiosInstance from "../config/axiosService";
import Constants from "expo-constants";

const {
    apiSendResetPasswordCodeUrl,
    apiVerifyResetPasswordCodeUrl,
    apiResetPasswordUrl,
} = Constants.expoConfig?.extra || {};

export const onSendResetPasswordCodeFeature = async (email: string) => {
    try {
        const { data } = await axiosInstance.post(
            apiSendResetPasswordCodeUrl,
            { email },
            { headers: { "Content-Type": "application/json" } },
        );
        return data;
    } catch (error) {
        console.error("Send Reset Password Code Error:", error);
    }
};

export const onVerifyResetPasswordCodeFeature = async (
    email: string,
    code: string,
) => {
    try {
        const { data } = await axiosInstance.post(
            apiVerifyResetPasswordCodeUrl,
            { email, code },
            { headers: { "Content-Type": "application/json" } },
        );
        return data;
    } catch (error) {
        console.error("Verify Reset Password Code Error:", error);
    }
};

export const onResetPasswordFeature = async (
    email: string,
    newPassword: string,
) => {
    try {
        const { data } = await axiosInstance.post(
            apiResetPasswordUrl,
            { email, newPassword },
            { headers: { "Content-Type": "application/json" } },
        );
        return data;
    } catch (error) {
        console.error("Reset Password Error:", error);
    }
};
