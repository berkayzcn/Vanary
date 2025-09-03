import { useEffect } from "react";
import { Text, View } from "react-native";

const VanDetails = ({ route }) => {

    const id = route.params.id
    console.log("gelen verinin id bilgisi", id)



    useEffect(() => {
        console.log("gelen verinin id bilgisi", id)
    }, [])

    return (
        <View>
<Text>id bilgis</Text>
        </View>
    )
}

export default VanDetails;