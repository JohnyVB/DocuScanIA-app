import "dotenv/config";

export default {
  expo: {
    name: "DocuScanAI",
    slug: "DocuScanAI",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    ios: { supportsTablet: true },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    extra: {
      eas: { projectId: "b239b539-c609-4824-8322-c6f811c0830f" },
      apiBaseUrl: process.env.API_BASE_URL,
      apiLoginUrl: process.env.API_LOGIN_URL,
      apiRegisterUrl: process.env.API_NEW_USER_URL,
      apiSendResetPasswordCodeUrl: process.env.API_SEND_RESET_PASSWORD_CODE_URL,
      apiVerifyResetPasswordCodeUrl:
        process.env.API_VERIFY_RESET_PASSWORD_CODE_URL,
      apiResetPasswordUrl: process.env.API_RESET_PASSWORD_URL,
      apiUploadDocumentUrl: process.env.API_UPLOAD_DOCUMENT_URL,
      apiDocumentsByUserId: process.env.API_DOCUMENTS_BY_USER_ID,
      apiDeleteDocumentById: process.env.API_DELETE_DOCUMENT_BY_ID,
    },
    plugins: ["expo-localization", "expo-font"],
  },
};
