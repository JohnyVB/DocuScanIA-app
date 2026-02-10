import { StyleSheet } from "react-native";
import { ThemeColors } from "../theme/colors";

const ScanStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            color: colors.text,
            alignSelf: "center",
        },
        body: {
            flex: 1,
            backgroundColor: colors.card,
            padding: 20,
            marginTop: 10,
            alignContent: "center",
            justifyContent: "center",
        },
        shadow: {
            elevation: 3,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 10,
        },
        btnScan: {
            backgroundColor: colors.primary,
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
            width: "60%",
            alignSelf: "center",
        },
        textBtnScan: { color: colors.textBtn, fontSize: 16, fontWeight: "600" },
        activityContainer: {
            flex: 1,
            justifyContent: "center", // vertical
            alignItems: "center", // horizontal
        },
        overlay: { flex: 1, justifyContent: "center", alignItems: "center" },
        scanBox: {
            width: "98%",
            height: "98%",
            borderWidth: 2,
            borderColor: "#00E0FF",
            borderRadius: 12,
        },
        captureBtn: {
            position: "absolute",
            bottom: 20,
            alignSelf: "center",
            backgroundColor: "#2563EB",
            width: 50,
            height: 50,
            borderRadius: 35,
            justifyContent: "center",
            alignItems: "center",
        },
        previewContainer: {
            position: "absolute",
            bottom: 90,
            width: "100%",
            paddingHorizontal: 10,
        },

        previewItem: { marginRight: 10, position: "relative" },

        previewImage: {
            width: 70,
            height: 90,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.4)",
        },

        removePhotoBtn: {
            position: "absolute",
            top: -6,
            right: -6,
            backgroundColor: "rgba(0,0,0,0.7)",
            borderRadius: 12,
            padding: 2,
        },
        sendBtn: {
            position: "absolute",
            bottom: 20,
            right: 40,
            backgroundColor: "green",
            width: 50,
            height: 50,
            borderRadius: 35,
            justifyContent: "center",
            alignItems: "center",
        },
    });

export default ScanStyles;
