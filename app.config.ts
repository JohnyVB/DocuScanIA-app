import "dotenv/config";

export default {
    expo: {
        name: "DocuScanAI-app",
        slug: "DocuScanAI-app",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        splash: {
            image: "./assets/splash-icon.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        ios: {
            supportsTablet: false,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#ffffff",
            },
        },
        extra: {
            apiDevelopmentUrl: process.env.API_DEVELOPMENT_URL,
            apiProductionUrl: process.env.API_PRODUCTION_URL,
            apiLoginUrl: process.env.API_LOGIN_URL,
            apiRegisterUrl: process.env.API_REGISTER_URL,
            apiForgotPasswordUrl: process.env.API_FORGOT_PASSWORD_URL,
            apiScanDocumentUrl: process.env.API_SCAN_DOCUMENT_URL,
            apiGetDocumentsUrl: process.env.API_GET_DOCUMENTS_URL,
        },
    },
};
