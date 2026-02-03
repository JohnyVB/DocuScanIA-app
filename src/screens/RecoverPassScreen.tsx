import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import GlobalStyles from "../styles/GlobalStyles";
import { useForm } from "../hooks/useForm";
import { RootStackParamList } from "../types/NavigationTypes";

type RecoverPassScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "RecoverPass">;

export const RecoverPassScreen = () => {
  const navigation = useNavigation<RecoverPassScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"email" | "code">("email");
  const { email, code, onChangeForm } = useForm({
    email: "",
    code: "",
  });

  const handleSendCode = async () => {
    if (!email.includes("@")) {
      Alert.alert("Error", "Por favor ingresa un email válido");
      return;
    }
    // Lógica para enviar el código de verificación
    console.log(`Enviando código de verificación a: ${email}`);
    setStep("code");
  };

  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      Alert.alert("Error", "El código debe tener 6 dígitos");
      return;
    }
    // Lógica para verificar el código
    console.log(`Verificando el código: ${code}`);
    Alert.alert("Éxito", "La contraseña ha sido recuperada con éxito.");
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView style={GlobalStyles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={80}>
      <Text style={styles.title}>DocuScanAI</Text>
      <Text style={styles.subtitle}>Recuperar Contraseña</Text>

      {step === "email" ? (
        <>
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(value) => onChangeForm(value, "email")} keyboardType="email-address" autoCapitalize="none" />
          <TouchableOpacity style={GlobalStyles.btn} onPress={handleSendCode} disabled={loading}>
            <Text style={{ color: "#fff", fontSize: 16 }}>Enviar Código de Verificación</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput style={styles.input} placeholder="Código de 6 dígitos" value={code} onChangeText={(value) => onChangeForm(value, "code")} keyboardType="number-pad" maxLength={6} />
          <TouchableOpacity style={GlobalStyles.btn} onPress={handleVerifyCode} disabled={loading}>
            <Text style={{ color: "#fff", fontSize: 16 }}>Verificar Código</Text>
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
