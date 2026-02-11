import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
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
import { useTheme } from "../context/ThemeContext";
import { onLoginFeature } from "../features/LoginFeature";
import { useForm } from "../hooks/useForm";
import userStore from "../store/userStore";
import LoginStyles from "../styles/LoginStyles";
import { LoginScreenNavigationProp } from "../types/NavigationTypes";

export const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [loading, setLoading] = useState(false);
    const { email, password, onChangeForm } = useForm({
        email: "johny.villegas.dev@gmail.com",
        password: "johny23",
    });
    const { setToken, setUserData } = userStore();
    const { colors } = useTheme();
    const styles = LoginStyles(colors);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }

        if (!email.includes("@")) {
            Alert.alert("Error", "Por favor ingresa un email válido");
            return;
        }
        try {
            setLoading(true);
            const data = await onLoginFeature(email, password);
            if (data.status === "success") {
                setUserData(data.userData);
                setToken(data.token);
                setLoading(false);
            } else {
                Alert.alert("Error", data.message || "Error al iniciar sesión");
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            console.error("LoginScreen Error:", error);
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80}>
            <Text style={styles.title}>DocuScanAI</Text>
            <Text style={styles.subtitle}>Iniciar Sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={colors.text}
                value={email}
                onChangeText={(value) => onChangeForm(value, "email")}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={colors.text}
                value={password}
                onChangeText={(value) => onChangeForm(value, "password")}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.btn}
                onPress={handleLogin}
                disabled={loading}>
                {loading && (
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                        Cargando...
                    </Text>
                )}
                {!loading && (
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                        Iniciar Sesión
                    </Text>
                )}
            </TouchableOpacity>

            <View style={styles.messagesContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("RecoverPassScreen")}>
                    <Text style={{ color: colors.primary }}>
                        ¿Olvidaste tu contraseña?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("RegisterScreen")}>
                    <Text style={{ color: colors.primary }}>
                        ¿No tienes una cuenta? Registrarse
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({});
