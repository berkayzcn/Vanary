import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Style from "./floatingButtonStyle"


function FloatingButton ({icon, onPress}) {
    return(
        <TouchableOpacity onPress={onPress} style={Style.container}>
            <Icon name={icon} size={28} color='white'/> 
        </TouchableOpacity>
    )
}

export default FloatingButton;