import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { formatDateToDisplay } from "../helper/FormatDateHelper";
import DocumentCardStyles from "../styles/DocumentCardStyles";
import { DocumenTypes } from "../types/DocumentType";
import { DocumentsScreenNavigationProp } from "../types/NavigationTypes";

export const DocumentCard = ({ document }: { document: DocumenTypes }) => {
    const { createdAt, data } = document;
    const { colors } = useTheme();
    const styles = DocumentCardStyles(colors);
    const navigation = useNavigation<DocumentsScreenNavigationProp>();

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate("DocumentDetailScreen", { document })
            }>
            <View style={styles.content}>
                <Text style={styles.title}>{data.document_type}</Text>

                <Text style={styles.category}>
                    {data.category.toUpperCase()}
                </Text>

                <Text style={styles.summary} numberOfLines={3}>
                    {data.summary}
                </Text>
                {data.people_mentioned?.[0] && (
                    <Text style={styles.person}>
                        👤 {data.people_mentioned[0].name}
                    </Text>
                )}
                <Text style={styles.address}>📍 {data.address}</Text>
                <View style={styles.footer}>
                    <Text style={styles.createdAt}>
                        📅 {formatDateToDisplay(createdAt)}
                    </Text>
                    <Text
                        style={[
                            styles.importance,
                            data.importance_level === "low"
                                ? styles.low
                                : data.importance_level === "medium"
                                  ? styles.medium
                                  : styles.high,
                        ]}>
                        {data.importance_level}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
