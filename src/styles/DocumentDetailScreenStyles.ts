import { StyleSheet } from "react-native";
import { ThemeColors } from "../theme/colors";

export const DocumentDetailScreenStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background },
        buttonContainer: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            marginBottom: 20,
            gap: 20,
        },
        buttonItem: {
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
            alignSelf: "center",
            width: 100,
        },
        buttonText: { color: colors.textBtn, fontSize: 16, fontWeight: "600" },
        buttonDelete: { backgroundColor: colors.danger },
        buttonGoBack: { backgroundColor: colors.primary },
        activityContainer: {
            flex: 1,
            justifyContent: "center", // vertical
            alignItems: "center", // horizontal
        },
    });
