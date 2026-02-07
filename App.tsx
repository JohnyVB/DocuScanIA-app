import {
    NavigationContainer,
    useNavigationContainerRef,
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";
import { RootNavigator } from "./src/navigator/RootNavigator";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
    const navigationRef = useNavigationContainerRef();
    const { theme } = useTheme();
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
