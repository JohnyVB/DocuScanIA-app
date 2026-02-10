import { StyleSheet } from "react-native";
import { ThemeColors } from "../theme/colors";

const DocumentCardStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        card: {
            backgroundColor: colors.cardBackground,
            borderRadius: 16,
            marginBottom: 16,
            overflow: "hidden",
            elevation: 3,
        },
        content: { padding: 14 },
        title: {
            fontSize: 16,
            fontWeight: "700",
            marginBottom: 4,
            color: colors.text,
        },
        category: { fontSize: 12, color: colors.text, marginBottom: 8 },
        summary: { fontSize: 13, color: colors.text, marginBottom: 8 },
        person: { fontSize: 13, marginBottom: 4, color: colors.text },
        address: { fontSize: 12, color: colors.text, marginBottom: 8 },
        footer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        createdAt: { fontSize: 12, color: colors.text },
        importance: {
            fontSize: 12,
            fontWeight: "600",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
            color: colors.text,
        },
        low: { backgroundColor: "#10B981" },
        medium: { backgroundColor: "#F59E0B" },
        high: { backgroundColor: "#EF4444" },
    });

export default DocumentCardStyles;
