import { Image, Text, TouchableOpacity } from "react-native";
import style from "./Style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


function Button({ title, onPress, iconName, imageRequire, color }) {



    return (
        <TouchableOpacity style={style.container} onPress={onPress} >
            {
                iconName ? (
                    <Icon name={iconName} size="22" color={color} />
                ) : (
                    <Image
                    style={style.image}
                    source={imageRequire} />
                )
            }
             <Text>{title}</Text> 
        </TouchableOpacity>
    )
}

export default Button;