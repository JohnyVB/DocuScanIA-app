import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import DocumentCardStyles from "../styles/DocumentCardStyles";
import { DocumentProps } from "../types/DocumentType";
import { formatDateToDisplay } from "../helper/FormatDateHelper";

type DocumentCardProps = { document: DocumentProps };

export const DocumentCard = ({ document }: DocumentCardProps) => {
    const { createdAt, data } = document;
    const { colors } = useTheme();
    const styles = DocumentCardStyles(colors);

    return (
        <TouchableOpacity style={styles.card}>
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
