import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { ScanScreen } from "../screens/ScanScreen";
import { DocumentsScreen } from "../screens/DocumentsScreen";

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Scan"
                component={ScanScreen}
                options={{ title: "Scan Document" }}
            />
            <Stack.Screen
                name="Documents"
                component={DocumentsScreen}
                options={{ title: "Your Documents" }}
            />
        </Stack.Navigator>
    );
};
