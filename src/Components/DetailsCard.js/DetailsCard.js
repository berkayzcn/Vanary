import { FlatList, Image, Text, View } from "react-native";
import Style from "./Style";
import Button from "../Button";

function DetailsCard({ title, price, press, photos }) {
    return (

        <View style={Style.container}>
            {
                photos && photos.length > 0 && (
                    < FlatList
                        data={photos}
                        horizontal
                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${item}` }}
                                style={{ width: 370, height: 330, marginRight: 5, borderRadius: 5 }}
                            />
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                )
            }

            <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 265 }}>
                    <Text>{title}</Text>
                    <Text>{price}</Text>
                </View>

                <Button title={"Teklif"} onPress={press} />

            </View>
        </View>
    )
}

export default DetailsCard;