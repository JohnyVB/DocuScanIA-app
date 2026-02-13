import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { i18n } from "@/i18n";

export type Language = "en" | "es" | "pt" | "gl" | "ca";

interface LanguageState {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const deviceLanguage = Localization.getLocales()[0].languageCode as Language;

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            language: deviceLanguage ?? "es",

            setLanguage: (lang) => {
                i18n.locale = lang;
                set({ language: lang });
            },
        }),
        {
            name: "app-language",
            storage: {
                getItem: async (name) => {
                    const value = await AsyncStorage.getItem(name);
                    return value ? JSON.parse(value) : null;
                },
                setItem: async (name, value) => {
                    await AsyncStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: async (name) => {
                    await AsyncStorage.removeItem(name);
                },
            },
            onRehydrateStorage: () => (state) => {
                if (state?.language) {
                    i18n.locale = state.language;
                }
            },
        },
    ),
);
