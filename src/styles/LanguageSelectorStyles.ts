import { ThemeColors } from "@/theme/colors";
import { StyleSheet } from "react-native";

const LanguageSelectorStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            marginTop: 24,
            padding: 18,
            borderRadius: 18,
            borderWidth: 1,
            backgroundColor: colors.card,
            borderColor: colors.border,
        },
        title: {
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 14,
            color: colors.text,
        },
        row: {
            paddingVertical: 14,
            paddingHorizontal: 14,
            borderRadius: 14,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        native: { fontSize: 15, fontWeight: "600" },
        label: { fontSize: 12, marginTop: 2, color: colors.textSecondary },
    });

export default LanguageSelectorStyles;
