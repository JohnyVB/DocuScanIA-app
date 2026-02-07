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
            backgroundColor: colors.card,
            borderRadius: 16,
            padding: 20,
            gap: 16,
            elevation: 3,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 10,
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
            marginTop: "auto",
            marginBottom: 24,
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
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
        },
        textToggle: { color: colors.text, fontSize: 16, marginBottom: 8 },
    });

export default ProfileStyles;
