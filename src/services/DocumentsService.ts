import axiosInstance from "../config/axiosService";
import Constants from "expo-constants";

const { apiDocumentsByUserId } = Constants.expoConfig?.extra || {};

export const onDocumentsByUserId = async (token: string) => {
    try {
        const { data } = await axiosInstance.get(apiDocumentsByUserId, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        if (data.status === "success") {
            return { status: "success", documents: data.documents };
        } else {
            return { status: "error", documents: [] };
        }
    } catch (error) {
        console.log("Error onDocumentsByUserId: ", error);
        return { status: "error", error };
    }
};
