import React from "react";
import { Text, View, StyleSheet } from "react-native";
import userStore from "../store/userStore";

export const ScanScreen = () => {
  const { token } = userStore();
  return (
    <View style={styles.container}>
      <Text>ScanScreen</Text>
      <Text>Token: {token}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
