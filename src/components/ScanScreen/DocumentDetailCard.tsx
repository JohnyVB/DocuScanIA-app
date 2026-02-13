import { Image } from "expo-image";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { formatDateToDisplay } from "../../helper/FormatDateHelper";
import DocumentDetailCardStyles from "../../styles/DocumentDetailCardStyles";
import { DocumentTypes } from "../../types/DocumentType";
import { i18n } from "@/i18n";

type DocumentDetailCardProps = { document: DocumentTypes };

export default function DocumentDetailCard({
    document,
}: DocumentDetailCardProps) {
    const { colors } = useTheme();
    const styles = DocumentDetailCardStyles(colors);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openImage = (uri: string) => {
        setSelectedImage(uri);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{document.data.document_type}</Text>
                <Text style={styles.meta}>
                    {i18n.t("DocumentDetailCard.category")}:{" "}
                    {document.data.category}
                </Text>
                <Text style={styles.meta}>
                    {i18n.t("DocumentDetailCard.created")}:{" "}
                    {formatDateToDisplay(document.createdAt)}
                </Text>

                {document.imagesUri?.length > 0 && (
                    <FlatList
                        data={document.imagesUri}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => openImage(item)}>
                                <Image
                                    source={{ uri: item }}
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                        )}
                    />
                )}

                <Section title={i18n.t("DocumentDetailCard.summary")}>
                    <Text style={styles.text}>{document.data.summary}</Text>
                </Section>

                <Section title={i18n.t("DocumentDetailCard.peopleMentioned")}>
                    {document.data.people_mentioned.map((p, index) => (
                        <View key={index} style={styles.listItem}>
                            <Text style={styles.bold}>{p.name}</Text>
                            <Text style={styles.textSecondary}>{p.role}</Text>
                        </View>
                    ))}
                </Section>

                <Section title={i18n.t("DocumentDetailCard.importantDates")}>
                    <View style={styles.timeline}>
                        {document.data.important_dates.map((d, index) => (
                            <View key={index} style={styles.timelineItem}>
                                <View style={styles.timelineDot} />
                                <View style={styles.timelineContent}>
                                    <Text style={styles.bold}>{d.date}</Text>
                                    <Text style={styles.textSecondary}>
                                        {d.description}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </Section>

                <Section title={i18n.t("DocumentDetailCard.additionalData")}>
                    {document.data.document_number && (
                        <Text style={styles.text}>
                            {i18n.t("DocumentDetailCard.documentNumber")}:{" "}
                            {document.data.document_number}
                        </Text>
                    )}
                    <Text style={styles.text}>
                        {i18n.t("DocumentDetailCard.address")}:{" "}
                        {document.data.address}
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            document.data.importance_level === "high"
                                ? { color: colors.danger }
                                : { color: colors.primary },
                        ]}>
                        {i18n.t("DocumentDetailCard.levelImportance")}:{" "}
                        {document.data.importance_level}
                    </Text>
                </Section>
            </View>
            {/* Modal para imagen zoom */}
            <Modal visible={modalVisible} transparent={true}>
                <TouchableOpacity
                    style={styles.modalBackground}
                    onPress={closeModal}
                    activeOpacity={1}>
                    {selectedImage && (
                        <Image
                            source={{ uri: selectedImage }}
                            style={styles.modalImage}
                            contentFit="contain" //
                        />
                    )}
                </TouchableOpacity>
            </Modal>
        </ScrollView>
    );
}

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    const { colors } = useTheme();
    const styles = DocumentDetailCardStyles(colors);
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    );
}
