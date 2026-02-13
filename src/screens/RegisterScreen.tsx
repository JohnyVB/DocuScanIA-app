import { i18n } from "@/i18n";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
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
import { onRegisterFeature } from "../services/RegisterService";
import LoginStyles from "../styles/LoginStyles";
import { RegisterScreenNavigationProp } from "../types/NavigationTypes";

export const RegisterScreen = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const [loading, setLoading] = useState(false);
    const { name, lastname, email, password, onChangeForm } = useForm({
        name: "",
        lastname: "",
        email: "",
        password: "",
    });
    const { colors } = useTheme();
    const styles = LoginStyles(colors);

    const handleRegister = async () => {
        if (!name || !lastname || !email || !password) {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }

        if (!email.includes("@")) {
            Alert.alert("Error", "Por favor ingresa un email válido");
            return;
        }

        try {
            const data = await onRegisterFeature(
                name,
                lastname,
                email,
                password,
            );

            if (data.status === "success") {
                Alert.alert(
                    "Éxito",
                    "Registro exitoso, por favor inicia sesión",
                );
                navigation.navigate("LoginScreen");
            } else {
                Alert.alert(
                    "Error",
                    data.message || "Error al registrar el usuario",
                );
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("RegisterScreen Error:", error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80}>
            <Text style={styles.title}>DocuScanAI</Text>
            <Text style={styles.subtitle}>
                {i18n.t("RegisterScreen.subTitle")}
            </Text>

            <TextInput
                style={styles.input}
                placeholder={i18n.t("RegisterScreen.placeholderInputName")}
                placeholderTextColor={colors.textSecondary}
                value={name}
                onChangeText={(value) => onChangeForm(value, "name")}
                autoCapitalize="words"
            />

            <TextInput
                style={styles.input}
                placeholder={i18n.t("RegisterScreen.placeholderInputLastName")}
                placeholderTextColor={colors.textSecondary}
                value={lastname}
                onChangeText={(value) => onChangeForm(value, "lastname")}
                autoCapitalize="words"
            />

            <TextInput
                style={styles.input}
                placeholder={i18n.t("RegisterScreen.placeholderInputEmail")}
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={(value) => onChangeForm(value, "email")}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder={i18n.t("RegisterScreen.placeholderInputPassword")}
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={(value) => onChangeForm(value, "password")}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.btn}
                onPress={handleRegister}
                disabled={loading}>
                {loading ? (
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                        {i18n.t("RegisterScreen.loadingButtonText")}
                    </Text>
                ) : (
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                        {i18n.t("RegisterScreen.registerButtonText")}
                    </Text>
                )}
            </TouchableOpacity>

            <View style={styles.messagesContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("LoginScreen")}>
                    <Text style={{ color: colors.primary }}>
                        {i18n.t("RegisterScreen.loginLinkText")}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};
