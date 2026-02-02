import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

type RootStackParamList = {
    Login: undefined;
    MyTabs: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;

export const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    return (
        <View style={styles.container}>
            <Text>LoginScreen</Text>
            <Button
                title="Login"
                onPress={() => navigation.navigate("MyTabs")}
            />
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
