import axiosInstance from "../config/axiosService";
import Constants from "expo-constants";

const { apiUploadDocumentUrl } = Constants.expoConfig?.extra || {};

export const onUploadDocument = async (photos: string[], token: string) => {
    const formData = new FormData();

    photos.forEach((imgUri, index) => {
        formData.append("images", {
            uri: imgUri,
            type: "image/jpeg",
            name: `page_${index}.jpg`,
        } as any);
    });

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
            newDoc: [],
        };
    }
};
