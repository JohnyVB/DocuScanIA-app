import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileItem from "../components/ProfileScreen/ProfileItem";
import ThemeToggle from "../components/ProfileScreen/ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import userStore from "../store/userStore";
import ProfileStyles from "../styles/ProfileStyles";
import { ProfileScreenNavigationProp } from "../types/ProfileTypes";

export const ProfileScreen = () => {
    const [loading, setLoading] = useState(false);
    const { setToken, userData, setUserData } = userStore();
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const { colors } = useTheme();
    const styles = ProfileStyles(colors);

    const handleLogOut = () => {
        setLoading(true);
        setToken(null);
        setUserData(null);
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <Ionicons
                    name="person-circle-outline"
                    size={120}
                    color={colors.primary}
                />
            </View>

            {/* Datos */}
            <View style={styles.card}>
                <ProfileItem label="Nombre" value={userData?.name || "N/A"} />
                <ProfileItem
                    label="Apellido"
                    value={userData?.lastname || "N/A"}
                />
                <ProfileItem label="Email" value={userData?.email || "N/A"} />
            </View>
            <View style={styles.toggleContainer}>
                <Text style={styles.textToggle}>Tema</Text>
                <ThemeToggle />
            </View>

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
                    <Text style={styles.logoutText}>Cerrando sesión...</Text>
                )}
                {!loading && (
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
};
