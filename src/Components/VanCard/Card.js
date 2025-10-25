import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import CardStyle from "./CardStyle";
import { use, useState } from "react";
import { getAuth } from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/MaterialIcons"
import style from "../Button2/style";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"

// function Card({ title, price, description, photos }) {
function Card({ item, edit, pressDelete }) {


  // const [tryedit, setedit] = useState(Boolean(edit))
  const currentUser = getAuth().currentUser
  // if (currentUser == item.email) {
  //   setedit()
  // }


  return (
    // <TouchableOpacity onPress={onpress}>

    <View style={CardStyle.container}>


      {item.photos && item.photos.length > 0 && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${item.photos[0]}` }}
          // style={{ width: 80, height: 80, marginRight: 5, borderRadius: 5 }}
          style={CardStyle.image}
        />
        // <FlatList
        //   data={item.photos}
        //   horizontal
        //   keyExtractor={(item, index) => index.toString()}
        //   renderItem={({ item }) => (
        //     <Image
        //       source={{ uri: `data:image/jpeg;base64,${item}` }}
        //       // style={{ width: 80, height: 80, marginRight: 5, borderRadius: 5 }}
        //       style={{ width: 380, height: 230, marginRight: 5, borderRadius: 9, padding : 7 }}
        //     />
        //   )}
        //   showsHorizontalScrollIndicator={false}
        // />
      )}

      <Text
        style={
          {
            color: "#192252",
            fontWeight: "500",
            fontSize: 17,
            marginTop: 9
            // margin : 
          }}
      >{item.title}</Text>

      <View style={{
        flexDirection: "row",
        marginTop: 4
      }}>
        <View style={{flexDirection : "row", marginRight : 7}}>
          <Icon name="bed" size="19" color="#8792ad" />
          <Text style={{ color: "#8792ad", marginLeft : 2 }}>4</Text>
        </View>

        <View style={{flexDirection : "row"}}>
          <SimpleLineIcons name="location-pin" size="17" color="#8792ad" />
          <Text style={{marginLeft :3, color: "#8792ad" }}>Ilford</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Icon name="star" size="17" color="#ffbd12" />
        <Text>4.5</Text>
        <Text style={{ color: "#8792ad",  color: "#8792ad" }}>(140 review)</Text>
      </View>

      <View style={CardStyle.details}>

        <Text style={{color : "#2952cb", fontSize : 15}}>From </Text>
        <Text
          style={
            {
              color: "#2952cb",
              fontWeight: "600",
              fontSize: 15

            }}
        >{item.price}</Text>

        <Text style={{color : "#2952cb", fontSize : 15}}> per day</Text>
      </View>



      {
        currentUser.email == item.email ? (
          <>
            <TouchableOpacity onPress={edit}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pressDelete}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </>
        ) : (
          ""
        )
      }
    </View>
    // </TouchableOpacity>
  )
}
export default Card;