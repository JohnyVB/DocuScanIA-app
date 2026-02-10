import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import userStore from "../store/userStore";
import ScanStyles from "../styles/ScanStyles";
import { Ionicons } from "@expo/vector-icons";
import { onUploadDocument } from "../features/ScanFeature";
import DocumentDetailCard from "../components/ScanScreen/DocumentDetailCard";
import { DocumenTypes } from "../types/ScanTypes";

export const ScanScreen = () => {
    const { token } = userStore();
    const { colors } = useTheme();
    const styles = ScanStyles(colors);
    const [cameraActivated, setCameraActivated] = useState<boolean>(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [loading, setLoading] = useState<boolean>(false);
    const cameraRef = useRef<CameraView>(null);
    const [document, setDocument] = useState<DocumenTypes | null>(null);
    const [photos, setPhotos] = useState<string[]>([]);

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, []);

    const sendPictures = async () => {
        setCameraActivated(false);
        setLoading(true);
        const data = await onUploadDocument(photos, token!);
        if (data.status === "success") {
            setDocument(data.newDoc);
            setLoading(false);
            setPhotos([]);
        } else {
            setLoading(false);
            Alert.alert(data.message);
        }
    };

    const takePicture = async () => {
        if (!cameraRef.current) return;
        const photo = await cameraRef.current.takePictureAsync({
            quality: 0.8,
            skipProcessing: false,
        });
        setPhotos((prev: string[]) => [...prev, photo.uri]);
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Text style={styles.title}>Scan</Text>
            {!document ? (
                <View style={[styles.body, styles.shadow]}>
                    {!cameraActivated ? (
                        !loading && !document ? (
                            <TouchableOpacity
                                style={styles.btnScan}
                                onPress={() => setCameraActivated(true)}>
                                <Text style={styles.textBtnScan}>
                                    Activar cámara
                                </Text>
                            </TouchableOpacity>
                        ) : loading && !document ? (
                            <View style={styles.activityContainer}>
                                <ActivityIndicator
                                    size="large"
                                    color={colors.text}
                                />
                            </View>
                        ) : null
                    ) : (
                        <View style={StyleSheet.absoluteFill}>
                            <CameraView
                                ref={cameraRef}
                                style={StyleSheet.absoluteFill}
                                facing="back"
                            />

                            {/* Overlay scanner */}
                            <View style={styles.overlay}>
                                <View style={styles.scanBox} />
                            </View>

                            {/* Botón captura */}
                            <TouchableOpacity
                                style={styles.captureBtn}
                                onPress={takePicture}>
                                <Ionicons
                                    name="camera"
                                    size={24}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                            <View style={styles.previewContainer}>
                                <FlatList
                                    data={photos}
                                    keyExtractor={(item, index) => item + index}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.previewItem}>
                                            <Image
                                                source={{ uri: item }}
                                                style={styles.previewImage}
                                            />

                                            {/* eliminar foto */}
                                            <TouchableOpacity
                                                style={styles.removePhotoBtn}
                                                onPress={() =>
                                                    setPhotos((prev) =>
                                                        prev.filter(
                                                            (_, i) =>
                                                                i !== index,
                                                        ),
                                                    )
                                                }>
                                                <Ionicons
                                                    name="close"
                                                    size={16}
                                                    color="#fff"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>

                            {photos.length > 0 && (
                                <TouchableOpacity
                                    style={styles.sendBtn}
                                    onPress={sendPictures}>
                                    <Ionicons
                                        name="send"
                                        size={20}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>
            ) : (
                <ScrollView>
                    <DocumentDetailCard
                        uid={document.uid}
                        createdAt={document.createdAt}
                        imagesUri={document.imagesUri}
                        data={document.data}
                    />
                    <TouchableOpacity
                        style={styles.btnScan}
                        onPress={() => {
                            setCameraActivated(true);
                            setDocument(null);
                        }}>
                        <Text style={styles.textBtnScan}>Activar cámara</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};
