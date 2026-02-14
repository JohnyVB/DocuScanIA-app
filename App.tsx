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
import { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

function MainApp() {
    const navigationRef = useNavigationContainerRef();
    const { theme } = useTheme();
    const language = useLanguageStore((state) => state.language);
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                i18n.locale = language;
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, [language]);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <NavigationContainer
                theme={theme === "dark" ? DarkTheme : DefaultTheme}
                ref={navigationRef}>
                <RootNavigator />
            </NavigationContainer>
        </View>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <MainApp />
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
