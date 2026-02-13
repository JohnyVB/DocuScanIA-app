import { LanguageSelectorCard } from "@/components/ProfileScreen/LanguageSelectorCard";
import { i18n } from "@/i18n";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileItem from "../components/ProfileScreen/ProfileItem";
import ThemeToggle from "../components/ProfileScreen/ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import documentStore from "../store/documentStore";
import userStore from "../store/userStore";
import ProfileStyles from "../styles/ProfileStyles";

export const ProfileScreen = () => {
    const [loading, setLoading] = useState(false);
    const { setToken, userData, setUserData } = userStore();
    const { colors } = useTheme();
    const styles = ProfileStyles(colors);
    const { setDocuments } = documentStore();

    const handleLogOut = () => {
        setLoading(true);
        setToken(null);
        setUserData(null);
        setLoading(false);
        setDocuments([]);
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <Ionicons
                        name="person-circle-outline"
                        size={100}
                        color={colors.primary}
                    />
                </View>

                {/* Datos */}
                <View style={styles.card}>
                    <ProfileItem
                        label={i18n.t("ProfileScreen.name")}
                        value={userData?.name || "N/A"}
                    />
                    <ProfileItem
                        label={i18n.t("ProfileScreen.lastName")}
                        value={userData?.lastname || "N/A"}
                    />
                    <ProfileItem
                        label={i18n.t("ProfileScreen.email")}
                        value={userData?.email || "N/A"}
                    />
                </View>
                <View style={styles.toggleContainer}>
                    <Text style={styles.textToggle}>
                        {i18n.t("ProfileScreen.theme")}
                    </Text>
                    <ThemeToggle />
                </View>

                {/* aca el cambio de idioma */}
                <LanguageSelectorCard />

                {/* Botón logout */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    disabled={loading}
                    onPress={handleLogOut}>
                    <Ionicons
                        name="log-out-outline"
                        size={20}
                        color={colors.textBtn}
                    />
                    {loading && (
                        <Text style={styles.logoutText}>
                            {i18n.t("ProfileScreen.loggingOut")}
                        </Text>
                    )}
                    {!loading && (
                        <Text style={styles.logoutText}>
                            {i18n.t("ProfileScreen.logOut")}
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
