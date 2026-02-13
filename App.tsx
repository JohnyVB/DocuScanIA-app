import {
    NavigationContainer,
    useNavigationContainerRef,
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";
import { RootNavigator } from "./src/navigator/RootNavigator";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLanguageStore } from "@/store/languageStore";
import { i18n } from "@/i18n";
import { useEffect } from "react";

export default function App() {
    const navigationRef = useNavigationContainerRef();
    const { theme } = useTheme();
    const language = useLanguageStore((state) => state.language);

    useEffect(() => {
        i18n.locale = language;
    }, [language]);

    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <NavigationContainer
                    theme={theme === "dark" ? DarkTheme : DefaultTheme}
                    ref={navigationRef}>
                    <RootNavigator />
                </NavigationContainer>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
