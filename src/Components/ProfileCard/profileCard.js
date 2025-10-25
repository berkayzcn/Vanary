import { Image, Text, View } from "react-native";
import style from "./profileCardStyle"
import { useEffect } from "react";

function ProfileCard({ item }) {

    // const userName = item ? item.email.split("@")[0] : "misafir"

    const displayName = item ? item.displayName : ""


    // useEffect(() =>{

    // })

    return (

        <View style={style.container}>
            <Image
                source={require("./../../Assets/profile.jpg")}
                style={style.image}
            />
            <View style={{paddingLeft : 12}}>
                {/* <Text>{userName}</Text> */}
                <Text style={style.username}>{displayName}</Text>
                <Text style={style.email}>{item.email}</Text>
            </View>

        </View>
    )
}

export default ProfileCard;