import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DocumenTypes } from "./DocumentType";

export type RootStackParamList = {
    LoginScreen: undefined;
    RegisterScreen: undefined;
    RecoverPassScreen: undefined;
    MyTabs: undefined;
    ScanScreen: undefined;
    ProfileScreen: undefined;
    DocumentStack: undefined;
    DocumentsScreen: undefined;
    DocumentDetailScreen: { document: DocumenTypes };
};

export type TabParamList = {
    ScanScreen: undefined;
    DocumentStack: undefined;
    ProfileScreen: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "LoginScreen"
>;

export type RecoverPassScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "RecoverPassScreen"
>;

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "RegisterScreen"
>;

export type DocumentsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "DocumentsScreen"
>;

export type DocumentDetailScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "DocumentDetailScreen"
>;
export type DocumentDetailScreenRouteProp = RouteProp<
    RootStackParamList,
    "DocumentDetailScreen"
>;

export type ProfileItemProps = { label: string; value: string };
