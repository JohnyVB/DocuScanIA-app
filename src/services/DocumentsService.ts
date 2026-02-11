import axiosInstance from "../config/axiosService";
import Constants from "expo-constants";

const { apiDocumentsByUserId, apiDeleteDocumentById } =
    Constants.expoConfig?.extra || {};

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

export const onDeleteDocumentById = async (
    firestoreId: string,
    token: string,
) => {
    try {
        const { data } = await axiosInstance.put(
            apiDeleteDocumentById,
            { documentId: firestoreId },
            { headers: { Authorization: `Bearer ${token}` } },
        );
        if (data.status === "success") {
            return {
                status: "success",
                message: "Documento eliminado correctamente",
            };
        } else {
            return {
                status: "error",
                message: "Error al momento de eliminar el documento",
            };
        }
    } catch (error) {
        console.log("Error onDeleteDocumentById: ", error);
        return { status: "error", error };
    }
};
