import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { ScanScreen } from "../screens/ScanScreen";
import { DocumentsScreen } from "../screens/DocumentsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "../screens/ProfileScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { RootStackParamList, TabParamList } from "../types/NavigationTypes";
import { RecoverPassScreen } from "../screens/RecoverPassScreen";
import userStore from "../store/userStore";
import { isTokenExpired } from "../features/NavigatorFeature";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Scan"
            screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Scan"
                component={ScanScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "scan" : "scan-outline"}
                            size={24}
                            color={focused ? "#007AFF" : "#8E8E93"}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Documents"
                component={DocumentsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "document" : "document-outline"}
                            size={24}
                            color={focused ? "#007AFF" : "#8E8E93"}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={24}
                            color={focused ? "#007AFF" : "#8E8E93"}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function AuthStack() {
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
        </Stack.Navigator>
    );
}

function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MyTabs" component={MyTabs} />
        </Stack.Navigator>
    );
}

export const RootNavigator = () => {
    const { token } = userStore();
    return (
        <>{!token || isTokenExpired(token) ? <AuthStack /> : <AppStack />}</>
    );
};
