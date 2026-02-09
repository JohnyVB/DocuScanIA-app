import { StyleSheet } from "react-native";
import { ThemeColors } from "../theme/colors";

const LoginStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            backgroundColor: colors.background,
        },
        btn: {
            backgroundColor: "#007bff",
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 8,
            marginTop: 10,
            width: 180,
            alignItems: "center",
        },
        title: {
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 10,
            color: colors.text,
        },
        subtitle: {
            fontSize: 18,
            color: colors.textSecondary,
            marginBottom: 30,
        },
        input: {
            width: "100%",
            padding: 12,
            borderWidth: 1,
            borderColor: colors.inputBorder,
            borderRadius: 8,
            marginBottom: 15,
            backgroundColor: colors.inputBackground,
            color: colors.text,
        },
        messagesContainer: {
            marginTop: 20,
            alignItems: "center",
            flexDirection: "column",
            gap: 10,
        },
        disabledInput: {
            backgroundColor: colors.background,
            color: colors.text,
        },
    });

export default LoginStyles;
