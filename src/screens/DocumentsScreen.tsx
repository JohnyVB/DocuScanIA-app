import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DocumentCard } from "../components/DocumentCard";
import { useTheme } from "../context/ThemeContext";
import { onDocumentsByUserId } from "../features/DocumentsFeature";
import userStore from "../store/userStore";
import DocumentsStyles from "../styles/DocumentsStyles";
import { DocumentProps } from "../types/DocumentDetailCardTypes";

export const DocumentsScreen = () => {
    const { token } = userStore();
    const { colors } = useTheme();
    const styles = DocumentsStyles(colors);
    const [loading, setLoading] = useState<boolean>(true);
    const [documents, setDocuments] = useState<DocumentProps[]>([]);

    const getDocuments = async () => {
        setLoading(true);
        const data = await onDocumentsByUserId(token!);
        if (data.status === "success") {
            setDocuments(data.documents);
        } else {
            setDocuments([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        getDocuments();
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Text style={styles.title}>Documents</Text>
            {documents.length === 0 && loading ? (
                <View style={styles.activityContainer}>
                    <ActivityIndicator size="large" color={colors.text} />
                </View>
            ) : (
                <FlatList
                    data={documents}
                    style={{ marginTop: 20 }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.uid}
                    renderItem={({ item }) => <DocumentCard document={item} />}
                />
            )}
        </SafeAreaView>
    );
};
