import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, StyleSheet, TextInput, Alert, TouchableOpacity } from "react-native";
import { useForm } from "../hooks/useForm";
import { onLoginFeature } from "../features/LoginFeature";
import { useState } from "react";
import userStore from "../store/userStore";

type RootStackParamList = {
  Login: undefined;
  MyTabs: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const { email, password, onChangeForm } = useForm({
    email: "",
    password: "",
  });
  const { setToken } = userStore();

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
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.btnInit} onPress={handleLogin} disabled={loading}>
        {loading && <Text style={{ color: "#fff", fontSize: 16 }}>Cargando...</Text>}
        {!loading && <Text style={{ color: "#fff", fontSize: 16 }}>Iniciar Sesión</Text>}
      </TouchableOpacity>

      <View style={styles.messagesContainer}>
        <TouchableOpacity onPress={() => Alert.alert("Registro", "Funcionalidad de registro aún no implementada")}>
          <Text style={{ color: "blue" }}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Registro", "Funcionalidad de registro aún no implementada")}>
          <Text style={{ color: "blue" }}>¿No tienes una cuenta? Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
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
  btnInit: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 10,
  },
  messagesContainer: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
  },
});
