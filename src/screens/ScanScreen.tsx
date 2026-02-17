import { i18n } from "@/i18n";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DocumentDetailCard from "../components/ScanScreen/DocumentDetailCard";
import { useTheme } from "../context/ThemeContext";
import { onUploadDocument } from "../services/ScanService";
import documentStore from "../store/documentStore";
import userStore from "../store/userStore";
import ScanStyles from "../styles/ScanStyles";
import { DocumentTypes } from "../types/DocumentType";

export const ScanScreen = () => {
  const { token } = userStore();
  const { colors } = useTheme();
  const styles = ScanStyles(colors);
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState<boolean>(false);
  const cameraRef = useRef<CameraView>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [document, setDocument] = useState<DocumentTypes | null>(null);
  const { documents, setDocuments } = documentStore();
  const [scanStatus, setScanStatus] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const sendPictures = async () => {
    setScanStatus(false);
    setLoading(true);
    const data = await onUploadDocument(photos, token!);
    if (data.status === "success") {
      const newDocument: DocumentTypes = data.newDoc;
      setDocument(newDocument);
      setDocuments([newDocument, ...documents]);
      setLoading(false);
      setPhotos([]);
    } else {
      setLoading(false);
      setErrorMessage(data.message);
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
      <Text style={styles.title}>{i18n.t("ScanScreen.title")}</Text>
      {!permission || !permission.granted ? (
        <View style={[styles.body, styles.shadow]}>
          <View style={[styles.activityContainer, { gap: 50 }]}>
            <Text style={{ color: colors.text }}>
              {i18n.t("ScanScreen.noPermissions")}
            </Text>
            <TouchableOpacity
              style={styles.btnScan}
              onPress={requestPermission}
            >
              <Text style={styles.textBtnScan}>
                {i18n.t("ScanScreen.grantPermission")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : scanStatus && !loading && !document ? (
        <View style={[styles.body, styles.shadow]}>
          <View style={StyleSheet.absoluteFill}>
            <CameraView
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              facing="back"
            />
            <View style={styles.overlay}>
              <View style={styles.scanBox} />
            </View>
            <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
              <Ionicons name="camera" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.previewContainer}>
              <FlatList
                data={photos}
                keyExtractor={(item, index) => item + index}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View style={styles.previewItem}>
                    <Image source={{ uri: item }} style={styles.previewImage} />
                    {/* eliminar foto */}
                    <TouchableOpacity
                      style={styles.removePhotoBtn}
                      onPress={() =>
                        setPhotos((prev) => prev.filter((_, i) => i !== index))
                      }
                    >
                      <Ionicons name="close" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            {photos.length > 0 && (
              <TouchableOpacity style={styles.sendBtn} onPress={sendPictures}>
                <Ionicons name="send" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : !scanStatus && loading ? (
        <View style={[styles.body, styles.shadow]}>
          <View style={styles.activityContainer}>
            <ActivityIndicator size="large" color={colors.text} />
          </View>
        </View>
      ) : !scanStatus && !loading && document ? (
        <ScrollView>
          <DocumentDetailCard document={document} />
          <TouchableOpacity
            style={styles.btnScan}
            onPress={() => {
              setScanStatus(true);
              setDocument(null);
            }}
          >
            <Text style={styles.textBtnScan}>
              {i18n.t("ScanScreen.activateCamera")}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        !scanStatus &&
        !loading &&
        !document && (
          <View style={[styles.body, styles.shadow]}>
            <View style={[styles.activityContainer, { gap: 50 }]}>
              <Text style={{ color: colors.text }}>{errorMessage}</Text>
              <TouchableOpacity
                style={styles.btnScan}
                onPress={() => {
                  setScanStatus(true);
                  setErrorMessage("");
                  setPhotos([]);
                }}
              >
                <Text style={styles.textBtnScan}>
                  {i18n.t("ScanScreen.activateCamera")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      )}
    </SafeAreaView>
  );
};
