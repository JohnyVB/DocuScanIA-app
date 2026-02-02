import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const DocumentsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Documents Screen</Text>
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
