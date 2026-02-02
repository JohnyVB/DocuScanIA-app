import {
    NavigationContainer,
    useNavigationContainerRef,
} from "@react-navigation/native";
import { RootNavigator } from "./src/navigator/RootNavigator";

export default function App() {
    const navigationRef = useNavigationContainerRef();
    return (
        <NavigationContainer ref={navigationRef}>
            <RootNavigator />
        </NavigationContainer>
    );
}
