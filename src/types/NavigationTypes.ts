import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    RecoverPass: undefined;
    MyTabs: undefined;
    Scan: undefined;
    Documents: undefined;
    Profile: undefined;
};

export type TabParamList = {
    Scan: undefined;
    Documents: undefined;
    Profile: undefined;
};

export type ProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Profile"
>;

export type ProfileItemProps = { label: string; value: string };
