import { Text, TouchableOpacity } from "react-native";
import style from "./Style";

function Button ({title, onPress}) {
    return(
        <TouchableOpacity style={style.container} onPress={onPress}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button;