import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, setTheme, colors } = useTheme();
    const isDark = theme === "dark";

    const translateX = useRef(new Animated.Value(isDark ? 26 : 0)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isDark ? 26 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [isDark]);

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleTheme}
            style={[
                styles.container,
                { backgroundColor: isDark ? colors.primary : colors.border },
            ]}>
            <Ionicons name="sunny-outline" size={16} color="#FBBF24" />
            <Ionicons name="moon-outline" size={16} color="#E5E7EB" />

            <Animated.View
                style={[
                    styles.thumb,
                    {
                        transform: [{ translateX }],
                        backgroundColor: colors.card,
                    },
                ]}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 56,
        height: 30,
        borderRadius: 20,
        paddingHorizontal: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    thumb: {
        position: "absolute",
        width: 24,
        height: 24,
        borderRadius: 12,
        left: 3,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
});
