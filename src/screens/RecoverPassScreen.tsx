import { i18n } from "@/i18n";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useForm } from "../hooks/useForm";
import {
    onResetPasswordFeature,
    onSendResetPasswordCodeFeature,
    onVerifyResetPasswordCodeFeature,
} from "../services/RecoverPassService";
import LoginStyles from "../styles/LoginStyles";
import { RecoverPassScreenNavigationProp } from "../types/NavigationTypes";

type StepType = "email" | "code" | "reset";

export const RecoverPassScreen = () => {
    const navigation = useNavigation<RecoverPassScreenNavigationProp>();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<StepType>("email");
    const { email, code, password, confirmPassword, onChangeForm } = useForm({
        email: "",
        code: "",
        password: "",
        confirmPassword: "",
    });
    const { colors } = useTheme();
    const styles = LoginStyles(colors);

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
        navigation.navigate("LoginScreen");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80}>
            <Text style={styles.title}>DocuScanAI</Text>
            <Text style={styles.subtitle}>
                {i18n.t("RecoverPassScreen.subTitle")}
            </Text>

            {step === "email" && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder={i18n.t(
                            "RecoverPassScreen.placeholderInputEmail",
                        )}
                        placeholderTextColor={colors.text}
                        value={email}
                        onChangeText={(value) => onChangeForm(value, "email")}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={handleSendCode}
                        disabled={loading}>
                        <Text style={{ color: "#fff", fontSize: 16 }}>
                            {i18n.t("RecoverPassScreen.textCodeButton")}
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            {step === "code" && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder={i18n.t(
                            "RecoverPassScreen.placeholderInputCode",
                        )}
                        placeholderTextColor={colors.text}
                        value={code}
                        onChangeText={(value) => onChangeForm(value, "code")}
                        keyboardType="number-pad"
                        maxLength={6}
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={handleVerifyCode}
                        disabled={loading}>
                        <Text style={{ color: "#fff", fontSize: 16 }}>
                            {i18n.t("RecoverPassScreen.textButtonVerifyCode")}
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
                        placeholder={i18n.t(
                            "RecoverPassScreen.placeholderInputNewPass",
                        )}
                        placeholderTextColor={colors.text}
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
                        placeholder={i18n.t(
                            "RecoverPassScreen.placeholderInputConfirmPass",
                        )}
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
                        style={styles.btn}
                        onPress={handleResetPassword}
                        disabled={loading}>
                        <Text style={{ color: "#fff", fontSize: 16 }}>
                            {i18n.t("RecoverPassScreen.textSavePasswordButton")}
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            <View style={styles.messagesContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ color: colors.primary }}>
                        {i18n.t("RecoverPassScreen.backButtonText")}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};
