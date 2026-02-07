import { StyleSheet } from "react-native";
import { ThemeColors } from "../theme/colors";

const NavigatorStyles = (colors: ThemeColors) =>
    StyleSheet.create({ barContainer: { backgroundColor: colors.background } });

export default NavigatorStyles;
