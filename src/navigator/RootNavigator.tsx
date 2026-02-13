import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "../context/ThemeContext";
import { isTokenExpired } from "../services/NavigatorService";
import { DocumentDetailScreen } from "../screens/DocumentDetailScreen";
import { DocumentsScreen } from "../screens/DocumentsScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { RecoverPassScreen } from "../screens/RecoverPassScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ScanScreen } from "../screens/ScanScreen";
import userStore from "../store/userStore";
import { RootStackParamList, TabParamList } from "../types/NavigationTypes";
import { i18n } from "@/i18n";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function DocumentStack() {
    return (
        <Stack.Navigator
            initialRouteName="DocumentsScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="DocumentsScreen"
                component={DocumentsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DocumentDetailScreen"
                component={DocumentDetailScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function MyTabs() {
    const { colors } = useTheme();
    return (
        <Tab.Navigator
            initialRouteName="ScanScreen"
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: colors.background },
            }}>
            <Tab.Screen
                name="ScanScreen"
                component={ScanScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "scan" : "scan-outline"}
                            size={24}
                            color={focused ? "#007AFF" : "#8E8E93"}
                        />
                    ),
                    title: i18n.t("MyTabs.ScanScreen"),
                }}
            />
            <Tab.Screen
                name="DocumentStack"
                component={DocumentStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "document" : "document-outline"}
                            size={24}
                            color={focused ? "#007AFF" : "#8E8E93"}
                        />
                    ),
                    title: i18n.t("MyTabs.DocumentScreen"),
                }}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={24}
                            color={focused ? "#007AFF" : "#8E8E93"}
                        />
                    ),
                    title: i18n.t("MyTabs.ProfileScreen"),
                }}
            />
        </Tab.Navigator>
    );
}

function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RecoverPassScreen"
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
    return !token || isTokenExpired(token) ? <AuthStack /> : <AppStack />;
};
