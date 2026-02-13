import { StyleSheet } from "react-native";
import { ThemeColors } from "../theme/colors";

const ProfileStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingHorizontal: 20,
        },
        avatarContainer: { alignItems: "center", marginVertical: 24 },
        card: {
            padding: 20,
            gap: 16,
            borderRadius: 18,
            borderWidth: 1,
            backgroundColor: colors.card,
            borderColor: colors.border,
        },
        item: {
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            paddingBottom: 8,
        },
        label: { fontSize: 13, color: colors.textSecondary },
        value: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.text,
            marginTop: 4,
        },
        logoutButton: {
            marginVertical: 24,
            backgroundColor: colors.danger,
            paddingVertical: 14,
            borderRadius: 12,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
        },
        logoutText: { color: colors.textBtn, fontSize: 16, fontWeight: "600" },
        toggleContainer: {
            marginTop: 24,
            padding: 18,
            borderRadius: 18,
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: colors.card,
            borderColor: colors.border,
        },
        textToggle: { fontSize: 16, fontWeight: "600", color: colors.text },
    });

export default ProfileStyles;
