import { Text, TouchableOpacity, View } from "react-native";


function Edit({ edit, delete }) {
    return (
        <View>
            <TouchableOpacity onPress={edit}>
                <Text>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={delete}>
                <Text>Delete</Text>
            </TouchableOpacity>
            
        </View>
    )
}


export default Edit;