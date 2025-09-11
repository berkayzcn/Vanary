import { Image, Text, View } from "react-native";
import style from "./profileCardStyle"
import { useEffect } from "react";

function ProfileCard({ item }) {

    const userName = item ? item.email.split("@")[0] : "misafir"
    

    // useEffect(() =>{
        
    // })

    return (

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

export default ProfileCard;