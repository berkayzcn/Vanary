import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import CardStyle from "./CardStyle";

function Card({ title, price, description, photos }) {
  return (
    // <TouchableOpacity onPress={onpress}>

    <View style={CardStyle.container}>
      <Text>{title}</Text>
      <Text>{price}</Text>

      {photos && photos.length > 0 && (
        <FlatList
          data={photos}
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