import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import userStore from "../store/userStore";
import ScanStyles from "../styles/ScanStyles";
import { Ionicons } from "@expo/vector-icons";
import { uploadDocument } from "../features/ScanFeature";

export const ScanScreen = () => {
    const { token } = userStore();
    const { colors } = useTheme();
    const styles = ScanStyles(colors);
    const [cameraActivated, setCameraActivated] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [loading, setLoading] = useState(false);
    const cameraRef = useRef<CameraView>(null);

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, []);

    const takePicture = async () => {
        if (!cameraRef.current) return;

        setLoading(true);

        const photo = await cameraRef.current.takePictureAsync({
            quality: 0.8,
        });

        console.log(photo.uri);
        // enviar al backend
        const result = await uploadDocument(photo.uri, token!);

        console.log("Upload result:", result);

        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Text style={styles.title}>Scan</Text>
            <View style={[styles.body, styles.shadow]}>
                {!cameraActivated ? (
                    <TouchableOpacity
                        style={styles.btnScan}
                        onPress={() => setCameraActivated(true)}>
                        <Text style={styles.textBtnScan}>Activar cámara</Text>
                    </TouchableOpacity>
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
                            <Ionicons name="camera" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};
