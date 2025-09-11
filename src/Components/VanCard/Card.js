import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import CardStyle from "./CardStyle";
import { use, useState } from "react";
import { getAuth } from "@react-native-firebase/auth";

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
      <Text>{item.title}</Text>

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



      {item.photos && item.photos.length > 0 && (
        <FlatList
          data={item.photos}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: `data:image/jpeg;base64,${item}` }}
              style={{ width: 80, height: 80, marginRight: 5, borderRadius: 5 }}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
    // </TouchableOpacity>
  )
}
export default Card;