import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const ScanScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ScanScreen</Text>
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
