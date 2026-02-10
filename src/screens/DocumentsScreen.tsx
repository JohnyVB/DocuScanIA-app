import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    ScrollView,
    Text,
    View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import DocumentsStyles from "../styles/DocumentsStyles";
import { DocumentProps } from "../types/DocumentDetailCardTypes";
import userStore from "../store/userStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { onDocumentsByUserId } from "../features/DocumentsFeature";
import { DocumentCard } from "../components/DocumentCard";

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
                    keyExtractor={(item) => item.uid}
                    renderItem={({ item }) => <DocumentCard document={item} />}
                />
            )}
        </SafeAreaView>
    );
};
