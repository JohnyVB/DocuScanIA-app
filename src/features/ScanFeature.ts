import axiosInstance from "../services/axiosService";
import Constants from "expo-constants";

const { apiUploadDocumentUrl } = Constants.expoConfig?.extra || {};

export const onUploadDocument = async (uri: string, token: string) => {
    const formData = new FormData();

    const fileName = uri.split("/").pop() || "document.jpg";

    formData.append("image", {
        uri,
        name: fileName,
        type: "image/jpeg",
    } as any);

    try {
        const { data } = await axiosInstance.post(
            apiUploadDocumentUrl,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return data;
    } catch (error) {
        console.log("Upload Error:", error);
        return {
            success: false,
            message: "Error al subir la imagen",
            newDoc: null,
        };
    }
};
