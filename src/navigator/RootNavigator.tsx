import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { ScanScreen } from "../screens/ScanScreen";
import { DocumentsScreen } from "../screens/DocumentsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "../screens/ProfileScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { RootStackParamList, TabParamList } from "../types/NavigationTypes";
import { RecoverPassScreen } from "../screens/RecoverPassScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Scan"
            screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Scan" component={ScanScreen} />
            <Tab.Screen name="Documents" component={DocumentsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export const RootNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RecoverPass"
                component={RecoverPassScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="MyTabs" component={MyTabs} />
        </Stack.Navigator>
    );
};
