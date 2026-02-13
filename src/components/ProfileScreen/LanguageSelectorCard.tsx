import { useTheme } from "@/context/ThemeContext";
import { Language, useLanguageStore } from "@/store/languageStore";
import LanguageSelectorStyles from "@/styles/LanguageSelectorStyles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { i18n } from "@/i18n";

const LANGUAGES: { code: Language; label: string; native: string }[] = [
    { code: "es", label: "Spanish", native: "Español" },
    { code: "en", label: "English", native: "English" },
    { code: "pt", label: "Portuguese", native: "Português" },
    { code: "gl", label: "Galician", native: "Galego" },
    { code: "ca", label: "Catalan", native: "Català" },
];

export const LanguageSelectorCard = () => {
    const { language, setLanguage } = useLanguageStore();
    const { colors } = useTheme();
    const styles = LanguageSelectorStyles(colors);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {i18n.t("LanguageSelectorCard.language")}
            </Text>

            {LANGUAGES.map((item) => {
                const active = language === item.code;

                return (
                    <TouchableOpacity
                        key={item.code}
                        activeOpacity={0.8}
                        onPress={() => setLanguage(item.code)}
                        style={[
                            styles.row,
                            {
                                backgroundColor: active
                                    ? colors.primary
                                    : "transparent",
                            },
                        ]}>
                        <View>
                            <Text
                                style={[
                                    styles.native,
                                    {
                                        color: active
                                            ? colors.textBtn
                                            : colors.text,
                                    },
                                ]}>
                                {item.native}
                            </Text>

                            {!active && (
                                <Text style={styles.label}>{item.label}</Text>
                            )}
                        </View>

                        {active && (
                            <Ionicons
                                name="checkmark-circle"
                                size={20}
                                color={colors.textBtn}
                            />
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
