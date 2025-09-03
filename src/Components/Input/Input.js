import { TextInput, View } from "react-native";
import styles from "./InputStyle"

function Input({placeholder, changeText}) {

    
    return (
        <View style={styles.container}>
            <TextInput 
                placeholder={placeholder}  
                onChangeText={changeText}
                />
        </View>
    )
}

export default Input