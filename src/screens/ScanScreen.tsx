import React from "react";
import { Text, View } from "react-native";
import GlobalStyles from "../../GlobalStyles";
import userStore from "../store/userStore";

export const ScanScreen = () => {
  const { token } = userStore();
  return (
    <View style={GlobalStyles.container}>
      <Text>ScanScreen</Text>
      <Text>Token: {token}</Text>
    </View>
  );
};
