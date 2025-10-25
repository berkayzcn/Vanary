import { Text, TouchableOpacity } from "react-native";
import style from "./style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


function Button3 ({title, onPress}) {
    return(
        <TouchableOpacity style={style.container} onPress={onPress} >
           
             <Text style={style.text}>£ {title}</Text> 
        </TouchableOpacity>
    )
}

export default Button3;