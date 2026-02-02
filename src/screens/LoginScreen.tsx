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
import GlobalStyles from "../../GlobalStyles";
import { onLoginFeature } from "../features/LoginFeature";
import { useForm } from "../hooks/useForm";
import userStore from "../store/userStore";
import { RootStackParamList } from "../types/NavigationTypes";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const { email, password, onChangeForm } = useForm({
    email: "",
    password: "",
  });
  const { setToken, token } = userStore();

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
        console.log(JSON.stringify(data, null, 2));
        setToken(data.token);
        setLoading(false);
        navigation.navigate("MyTabs");
      } else {
        Alert.alert("Error", data.message || "Error al iniciar sesión");
        setLoading(false);
      }
    } catch (error) {
      console.error("LoginScreen Error:", error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={GlobalStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <Text style={styles.title}>DocuScanAI</Text>
      <Text style={styles.subtitle}>Iniciar Sesión</Text>

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

      <TouchableOpacity style={GlobalStyles.btn} onPress={handleLogin} disabled={loading}>
        {loading && <Text style={{ color: "#fff", fontSize: 16 }}>Cargando...</Text>}
        {!loading && <Text style={{ color: "#fff", fontSize: 16 }}>Iniciar Sesión</Text>}
      </TouchableOpacity>

      <View style={styles.messagesContainer}>
        <TouchableOpacity onPress={() => Alert.alert("Registro", "Funcionalidad de registro aún no implementada")}>
          <Text style={{ color: "blue" }}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "blue" }}>¿No tienes una cuenta? Registrarse</Text>
        </TouchableOpacity>
        {token.length > 0 && <Text>Token actual: {token}</Text>}
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
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
  },
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
