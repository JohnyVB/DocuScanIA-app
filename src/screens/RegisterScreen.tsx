import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import GlobalStyles from "../../GlobalStyles";

export const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={GlobalStyles.container}>
      <Text>Register Screen</Text>
      <TouchableOpacity style={GlobalStyles.btn} onPress={() => navigation.goBack()}>
        <Text style={{ color: "#fff", fontSize: 16 }}>Atrás</Text>
      </TouchableOpacity>
    </View>
  );
};
