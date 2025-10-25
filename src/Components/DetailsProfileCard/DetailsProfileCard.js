import { Image, Text, View } from "react-native";
import style from "./Style"
import { useEffect } from "react";

function DetailsProfileCard() {

    

    return(
        <View style={style.container}>
                    <Image
                        source={require("./../../Assets/profile.jpg")}
                        style={style.image}
                    />
                    <Text>{userName}</Text>
                    {/* <Text>{item.displayName()}</Text> */}
                    <Text>{item.email}</Text>
        
                </View>
    )
}

export default DetailsProfileCard