import React, { use, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import userStore from "../store/userStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/NavigationTypes";

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Profile">;

export const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const { setToken } = userStore();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogOut = () => {
    // Lógica para cerrar sesión
    setLoading(true);
    setToken("");
    navigation.navigate("Login");
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <TouchableOpacity style={styles.btnLogOut} disabled={loading} onPress={handleLogOut}>
        {loading && <Text style={{ color: "#fff", fontSize: 16 }}>Cerrando sesión...</Text>}
        {!loading && <Text style={{ color: "#fff", fontSize: 16 }}>Cerrar Sesión</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnLogOut: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 10,
  },
});
