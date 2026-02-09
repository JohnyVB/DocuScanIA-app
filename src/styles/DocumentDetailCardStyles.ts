import { Dimensions, StyleSheet } from "react-native";
import { ThemeColors } from "../theme/colors";
const { width } = Dimensions.get("window");

const DocumentDetailCardStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: { padding: 16, backgroundColor: colors.background },
        card: {
            backgroundColor: colors.card,
            borderRadius: 12,
            padding: 16,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 3,
        },
        title: {
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 4,
            color: colors.text,
        },
        meta: { color: colors.textSecondary, marginBottom: 4 },
        image: {
            width: width - 64, // padding 16*2 + spacing
            height: 300,
            borderRadius: 12,
        },
        section: { marginTop: 16 },
        sectionTitle: {
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 8,
            color: colors.text,
        },
        text: { fontSize: 14, color: colors.text },
        textSecondary: { fontSize: 14, color: colors.textSecondary },
        bold: { fontSize: 14, fontWeight: "600", color: colors.text },
        listItem: { marginBottom: 10 },
        timeline: {
            borderLeftWidth: 2,
            borderLeftColor: colors.border,
            paddingLeft: 12,
        },
        timelineItem: {
            flexDirection: "row",
            marginBottom: 16,
            alignItems: "flex-start",
        },
        timelineDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: colors.primary,
            marginLeft: -16,
            marginTop: 6,
        },
        timelineContent: { marginLeft: 8, flex: 1 },
        modalBackground: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.95)", // fondo oscuro
            justifyContent: "center",
            alignItems: "center",
        },
        modalImage: {
            width: "100%", // ocupa todo el ancho de pantalla
            height: "100%", // ocupa todo el alto
        },
    });

export default DocumentDetailCardStyles;
