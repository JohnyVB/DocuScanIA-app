import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors } from "../theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark" | "system";

type ThemeContextType = {
    theme: Theme;
    colors: typeof lightColors;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const systemTheme = useColorScheme();

    const [theme, setTheme] = useState<Theme>("system");

    const resolvedTheme = theme === "system" ? systemTheme || "light" : theme;

    const colors = resolvedTheme === "dark" ? darkColors : lightColors;

    useEffect(() => {
        AsyncStorage.getItem("theme").then((saved) => {
            if (saved) setTheme(saved as Theme);
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, colors, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
