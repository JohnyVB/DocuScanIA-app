import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import GlobalStyles from "../styles/GlobalStyles";
import userStore from "../store/userStore";
import { RootStackParamList } from "../types/NavigationTypes";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Profile"
>;

export const ProfileScreen = () => {
    const [loading, setLoading] = useState(false);
    const { setToken, userData, setUserData, token } = userStore();
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const handleLogOut = () => {
        setLoading(true);
        setToken(null);
        setUserData(null);
        setLoading(false);
    };

    return (
        <View style={GlobalStyles.container}>
            <Text>Profile Screen</Text>
            <Text>Token: {token}</Text>
            <Text>User Data: {JSON.stringify(userData, null, 2)}</Text>
            <TouchableOpacity
                style={GlobalStyles.btn}
                disabled={loading}
                onPress={handleLogOut}>
                {loading && (
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                        Cerrando sesión...
                    </Text>
                )}
                {!loading && (
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                        Cerrar Sesión
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};
