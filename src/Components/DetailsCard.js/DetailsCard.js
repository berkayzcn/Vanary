import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Style from "./Style";
import Button3 from "../Button3";
import { getAuth } from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/MaterialIcons"
import Icon2 from "react-native-vector-icons/FontAwesome"
//import Icon2 from "react-native-vector-icons/MaterialDesignlIcons"


// function DetailsCard({ title, price, press, photos }) {
function DetailsCard({ details, press }) {

    const currentUserEmail = getAuth().currentUser.email

    return (

        <View style={Style.container}>


            {
                details.photos && details.photos.length > 0 && (
                    < FlatList
                        data={details.photos}
                        horizontal
                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${item}` }}
                                style={{ width: 370, height: 240, borderRadius: 5 }}
                            />
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                )
            }
            <ScrollView
            >

                <View style={Style.innerContainer}>

                    <View style={{ flexDirection: "row" }}>
                        <View style={{}}>

                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 19,
                                            marginBottom: 7
                                        }}
                                    >{details.title}</Text>
                                    <Text>London, United Kingdom</Text>
                                </View>
                                <View>
                                    {
                                        details.email == currentUserEmail ? (
                                            ""
                                        ) : (

                                            <TouchableOpacity
                                                onPress={press}
                                                style={{
                                                    alignItems: "center",
                                                    marginLeft: 55
                                                }}
                                            >
                                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                    <Text style={{
                                                        //color: "white",
                                                        // fontWeight: "bold",
                                                        // alignItems : "center"

                                                    }}>From £{details.price} per day</Text>

                                                    <Text
                                                        style={{
                                                            // borderWidth : 1,
                                                            padding: 9,
                                                            borderRadius: 14,
                                                            backgroundColor: "#192252",
                                                            color: "white",
                                                            marginTop: 5
                                                        }}
                                                    > Request</Text>
                                                </View>
                                            </TouchableOpacity>
                                            // <Button3 title={details.price} onPress={press} />
                                        )
                                    }
                                </View>
                            </View>
                            {/* <Icon name="search" size={22} style={{top : 13, left : 190}}/> */}

                            <View style={{ flexDirection: "row", marginVertical: 7 }}>
                                <Icon name="star" size="17" color="#ffbd12" />
                                <Text>4.5</Text>
                                <Text style={{ color: "#8792ad", color: "#8792ad" }}>(140 review)</Text>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: 9 }}>
                                <Icon name="bed" size="23" color="#8792ad" />
                                <View style={{ marginLeft: 17 }}>
                                    <Text>Sleeps 4</Text>
                                    <Text style={{ color: "#8792ad" }}>Comfortable sleeping area for 4 person</Text>
                                </View>
                            </View>


                            <View style={{ flexDirection: "row", marginRight: 7, marginTop: 15 }}>
                                <Icon name="airline-seat-recline-normal" size="23" color="#8792ad" />
                                <View style={{ marginLeft: 17 }}>
                                    <Text>5 secute places</Text>
                                    <Text style={{ color: "#8792ad" }}>Comfortable sleeping area for 4 person</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginRight: 7, marginTop: 15, marginBottom: 21 }}>
                                <Icon2 name="drivers-license-o" size="23" color="#8792ad" />
                                <View style={{ marginLeft: 17 }}>
                                    <Text>Driving license B</Text>
                                    <Text style={{ color: "#8792ad" }}>Your car license is sufficient to drive this vehicle weighing less than 3500 kg</Text>
                                </View>
                            </View>

                            {/* <Text>{details.price}</Text> */}



                            <View style={{
                                // flexDirection: "row",
                                borderWidth: 1,
                                borderColor: "grey",
                                borderRadius: 12,
                                padding: 9,
                                width: 360
                            }}>

                                <View
                                    style={{
                                        flexDirection: "row",
                                    }}
                                >

                                    <Image
                                        source={require("./../../Assets/profile.jpg")}
                                        style={{ width: 50, height: 50, borderRadius: 35, borderWidth: 2, borderColor: "green" }}
                                    />
                                    <View style={{ paddingLeft: 13, justifyContent: "center" }}>
                                        <Text>
                                            Meet the owner, {details.email}
                                        </Text>
                                        <Text style={{ fontSize: 11, paddingTop: 2 }}>Member Since August 2025</Text>

                                    </View>
                                </View>


                                <View style={{ flexDirection: "row", marginRight: 7, marginTop: 15 }}>
                                    <Icon name="star" size="23" color="#8792ad" />
                                    <View style={{ marginLeft: 17 }}>
                                        <Text style={{ color: "#8792ad" }}>5/5 based on 3 reviews</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", marginRight: 7, marginTop: 15 }}>
                                    <Icon name="calendar-month" size="23" color="#8792ad" />
                                    <View style={{ marginLeft: 17 }}>
                                        <Text style={{ color: "#8792ad" }}>Hired out 5 times</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", marginRight: 7, marginTop: 15 }}>
                                    <Icon name="message" size="23" color="#8792ad" />
                                    <View style={{ marginLeft: 17 }}>
                                        <Text style={{ color: "#8792ad" }}>Replies within an hour</Text>
                                    </View>
                                </View>
                            </View>



                        </View>



                    </View>
                </View>
            </ScrollView>

            {/* {
                details.email == currentUserEmail ? (
                    ""
                ) : (

                    <TouchableOpacity
                        style={{
                            // backgroundColor: "#192252",
                            // borderTopWidth: 1,
                            // borderRadius: 25,
                            // borderColor : "grey",
                            borderColor: "#e6edf8",
                            borderColor: "grey",
                            // paddingHorizontal : 65,
                            //margin: 5,
                            alignItems: "center",
                            width: 430,
                            height: 60,
                            justifyContent: "center",
                            bottom: 13,
                            // marginLeft : 37,
                            position: "relative",
                            paddingBottom: 25

                        }}
                    >
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                            <Text style={{
                                //color: "white",
                                fontWeight: "bold",
                                // alignItems : "center"
                            }}>From £{details.price} per day</Text>

                            <Text
                                style={{
                                    // borderWidth : 1,
                                    padding: 5,
                                    borderRadius: 14,
                                    backgroundColor: "#192252",
                                    color: "white"
                                }}
                            > Request</Text>
                        </View>
                    </TouchableOpacity>

                    // <Button3 title={details.price} onPress={press} />
                )
            } */}


        </View>
    )
}

export default DetailsCard;