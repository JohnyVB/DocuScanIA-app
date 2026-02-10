import { StyleSheet } from "react-native";
import { ThemeColors } from "../theme/colors";

const DocumentsStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingHorizontal: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            color: colors.text,
            alignSelf: "center",
        },
        shadow: {
            elevation: 3,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 10,
        },
        activityContainer: {
            flex: 1,
            justifyContent: "center", // vertical
            alignItems: "center", // horizontal
        },
        noDataContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        subTitle: { color: colors.text, fontSize: 16 },
    });

export default DocumentsStyles;
