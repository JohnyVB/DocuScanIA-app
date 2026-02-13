import { i18n } from "@/i18n";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DocumentDetailCard from "../components/ScanScreen/DocumentDetailCard";
import { useTheme } from "../context/ThemeContext";
import { onDeleteDocumentById } from "../services/DocumentsService";
import documentStore from "../store/documentStore";
import userStore from "../store/userStore";
import { DocumentDetailScreenStyles } from "../styles/DocumentDetailScreenStyles";
import {
    DocumentDetailScreenNavigationProp,
    DocumentDetailScreenRouteProp,
} from "../types/NavigationTypes";

export const DocumentDetailScreen = () => {
    const { token } = userStore();
    const navigation = useNavigation<DocumentDetailScreenNavigationProp>();
    const route = useRoute<DocumentDetailScreenRouteProp>();
    const { documents, setDocuments } = documentStore();
    const { colors } = useTheme();
    const styles = DocumentDetailScreenStyles(colors);
    const [loading, setLoading] = useState<boolean>(false);
    const { document } = route.params;

    const filterDocument = async () => {
        const newDocuments = documents.filter(
            (item) => item.firestoreId !== document.firestoreId,
        );
        setDocuments(newDocuments);
    };

    const deleteDocument = async () => {
        setLoading(true);
        const response = await onDeleteDocumentById(
            document.firestoreId,
            token!,
        );

        if (response.status === "success") {
            await filterDocument();
            navigation.goBack();
        } else {
            Alert.alert("Error al eliminar el documento");
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            {!loading ? (
                <ScrollView>
                    <DocumentDetailCard document={document} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.buttonItem, styles.buttonDelete]}
                            onPress={deleteDocument}>
                            <Text style={styles.buttonText}>
                                {i18n.t("DocumentDetailScreen.btnDelete")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttonItem, styles.buttonGoBack]}
                            onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>
                                {i18n.t("DocumentDetailScreen.btnGoBack")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            ) : (
                <View style={styles.activityContainer}>
                    <ActivityIndicator size="large" color={colors.text} />
                </View>
            )}
        </SafeAreaView>
    );
};
