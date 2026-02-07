import { Text, View } from "react-native";
import ProfileStyles from "../../styles/ProfileStyles";
import { ProfileItemProps } from "../../types/ProfileTypes";
import { useTheme } from "../../context/ThemeContext";

const ProfileItem = ({ label, value }: ProfileItemProps) => {
    const { colors } = useTheme();
    const styles = ProfileStyles(colors);
    return (
        <View style={styles.item}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
};

export default ProfileItem;
