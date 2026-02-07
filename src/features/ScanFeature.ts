import axiosInstance from "../services/axiosService";

export const uploadDocument = async (uri: string, token: string) => {
    const formData = new FormData();

    const fileName = uri.split("/").pop() || "document.jpg";

    formData.append("image", {
        uri,
        name: fileName,
        type: "image/jpeg",
    } as any);

    try {
        const { data } = await axiosInstance.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    } catch (error) {
        console.log("Upload Error:", error);
        return { success: false, message: "Error al subir la imagen" };
    }
};
