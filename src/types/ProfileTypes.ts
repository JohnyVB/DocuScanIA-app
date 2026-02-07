import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./NavigationTypes";

export type ProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Profile"
>;

export type ProfileItemProps = { label: string; value: string };
