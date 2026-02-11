import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DocumentDetailCard from "../components/ScanScreen/DocumentDetailCard";
import { useTheme } from "../context/ThemeContext";
import { DocumentDetailScreenStyles } from "../styles/DocumentDetailScreenStyles";
import {
    DocumentDetailScreenNavigationProp,
    DocumentDetailScreenRouteProp,
} from "../types/NavigationTypes";

export const DocumentDetailScreen = () => {
    const navigation = useNavigation<DocumentDetailScreenNavigationProp>();
    const route = useRoute<DocumentDetailScreenRouteProp>();
    const { colors } = useTheme();
    const styles = DocumentDetailScreenStyles(colors);
    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView>
                <DocumentDetailCard document={route.params.document} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.buttonItem, styles.buttonDelete]}
                        onPress={() => {}}>
                        <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonItem, styles.buttonGoBack]}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Atras</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
