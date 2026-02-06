import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
import GlobalStyles from "../styles/GlobalStyles";
import { useForm } from "../hooks/useForm";
import { RootStackParamList } from "../types/NavigationTypes";
import { onRegisterFeature } from "../features/RegisterFeature";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Register"
>;

export const RegisterScreen = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const [loading, setLoading] = useState(false);
    const { name, lastname, email, password, onChangeForm } = useForm({
        name: "",
        lastname: "",
        email: "",
        password: "",
    });

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
                navigation.navigate("Login");
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
            style={GlobalStyles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80}>
            <Text style={styles.title}>DocuScanAI</Text>
            <Text style={styles.subtitle}>Registro</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={(value) => onChangeForm(value, "name")}
                autoCapitalize="words"
            />

            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={lastname}
                onChangeText={(value) => onChangeForm(value, "lastname")}
                autoCapitalize="words"
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(value) => onChangeForm(value, "email")}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={(value) => onChangeForm(value, "password")}
                secureTextEntry
            />

            <TouchableOpacity
                style={GlobalStyles.btn}
                onPress={handleRegister}
                disabled={loading}>
                {loading ? (
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                        Cargando...
                    </Text>
                ) : (
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                        Registrarse
                    </Text>
                )}
            </TouchableOpacity>

            <View style={styles.messagesContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{ color: "blue" }}>
                        ¿Ya tienes una cuenta? Iniciar Sesión
                    </Text>
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
    messagesContainer: {
        marginTop: 20,
        alignItems: "center",
        flexDirection: "column",
        gap: 10,
    },
});
