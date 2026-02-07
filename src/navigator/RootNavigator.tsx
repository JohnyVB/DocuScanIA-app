import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "../context/ThemeContext";
import { isTokenExpired } from "../features/NavigatorFeature";
import { DocumentsScreen } from "../screens/DocumentsScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { RecoverPassScreen } from "../screens/RecoverPassScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ScanScreen } from "../screens/ScanScreen";
import userStore from "../store/userStore";
import { RootStackParamList, TabParamList } from "../types/NavigationTypes";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MyTabs() {
    const { colors } = useTheme();
    return (
        <Tab.Navigator
            initialRouteName="Scan"
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: colors.background },
            }}>
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
