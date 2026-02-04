import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    onResetPasswordFeature,
    onSendResetPasswordCodeFeature,
    onVerifyResetPasswordCodeFeature,
} from "../features/RecoverPassFeature";
import { useForm } from "../hooks/useForm";
import GlobalStyles from "../styles/GlobalStyles";
import { RootStackParamList } from "../types/NavigationTypes";

type RecoverPassScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "RecoverPass"
>;

type StepType = "email" | "code" | "reset";

export const RecoverPassScreen = () => {
    const navigation = useNavigation<RecoverPassScreenNavigationProp>();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<StepType>("email");
    const { email, code, password, confirmPassword, onChangeForm } = useForm({
        email: "johny.villegas.dev@gmail.com",
        code: "",
        password: "",
        confirmPassword: "",
    });

    const handleSendCode = async () => {
        if (!email.includes("@")) {
            Alert.alert("Error", "Por favor ingresa un email válido");
            return;
        }
        setLoading(true);
        const data = await onSendResetPasswordCodeFeature(email);
        if (!data || data.status !== "success") {
            Alert.alert(
                "Error",
                data?.message || "Error al enviar el código de verificación",
            );
            return;
        }
        setLoading(false);
        setStep("code");
    };

    const handleVerifyCode = async () => {
        if (code.length !== 6) {
            Alert.alert("Error", "El código debe tener 6 dígitos");
            return;
        }

        setLoading(true);
        const data = await onVerifyResetPasswordCodeFeature(email, code);

        if (!data || data.status !== "success") {
            Alert.alert(
                "Error",
                data?.message || "Error al verificar el código de verificación",
            );
            setLoading(false);
            return;
        }

        setLoading(false);
        setStep("reset");
    };

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden");
            return;
        }
        if (password.length < 6) {
            Alert.alert(
                "Error",
                "La contraseña debe tener al menos 6 caracteres",
            );
            return;
        }

        const data = await onResetPasswordFeature(email, password);
        if (!data || data.status !== "success") {
            setLoading(false);
            Alert.alert(
                "Error",
                data?.message || "Error al cambiar la contraseña",
            );
            return;
        }
        setLoading(false);
        navigation.navigate("Login");
    };

    return (
        <KeyboardAvoidingView
            style={GlobalStyles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80}>
            <Text style={styles.title}>DocuScanAI</Text>
            <Text style={styles.subtitle}>Recuperar Contraseña</Text>

            {step === "email" && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(value) => onChangeForm(value, "email")}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={GlobalStyles.btn}
                        onPress={handleSendCode}
                        disabled={loading}>
                        <Text style={{ color: "#fff", fontSize: 16 }}>
                            Enviar Código de Verificación
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            {step === "code" && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Código de 6 dígitos"
                        value={code}
                        onChangeText={(value) => onChangeForm(value, "code")}
                        keyboardType="number-pad"
                        maxLength={6}
                    />
                    <TouchableOpacity
                        style={GlobalStyles.btn}
                        onPress={handleVerifyCode}
                        disabled={loading}>
                        <Text style={{ color: "#fff", fontSize: 16 }}>
                            Verificar Código
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            {step === "reset" && (
                <>
                    <TextInput
                        style={[styles.input, styles.disabledInput]}
                        value={email}
                        editable={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nueva Contraseña"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={password}
                        onChangeText={(value) =>
                            onChangeForm(value, "password")
                        }
                        secureTextEntry
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar Nueva Contraseña"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={confirmPassword}
                        onChangeText={(value) =>
                            onChangeForm(value, "confirmPassword")
                        }
                        secureTextEntry
                    />
                    <TouchableOpacity
                        style={GlobalStyles.btn}
                        onPress={handleResetPassword}
                        disabled={loading}>
                        <Text style={{ color: "#fff", fontSize: 16 }}>
                            Guardar Contraseña
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            <View style={styles.messagesContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ color: "blue" }}>Atrás</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    subtitle: { fontSize: 18, color: "#666", marginBottom: 30 },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    disabledInput: { backgroundColor: "#f0f0f0", color: "#a0a0a0" },
    messagesContainer: {
        marginTop: 20,
        alignItems: "center",
        flexDirection: "column",
        gap: 10,
    },
});
