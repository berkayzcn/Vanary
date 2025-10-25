import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Card from "../../Components/VanCard";
import FloatingButton from "../../Components/FloatingButton";
import ContentInputModal from "../../Hooks/ContentInputModal";
import { useEffect, useState } from "react";
import database from "@react-native-firebase/database"
import useParseData from "../../Hooks/useParseData/useParseData";
import storage from '@react-native-firebase/storage';
import { getAuth } from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/MaterialIcons"
import styles from "./homeStyle"

function Home({ navigation }) {

    const [inputModalVisible, setInputModalVisible] = useState()
    const [vans, setVans] = useState();

    const userEmail = getAuth().currentUser.email
    // const userName = getAuth().currentUser.displayName

    useEffect(() => {
        const vansRef = database().ref('Vans')

        const onValueChange = vansRef.on('value', snapshot => {
            const contentData = snapshot.val();
            if (contentData) {
                console.log("Bu ilk şekli", contentData)
                const parsedData = useParseData(contentData)
                console.log("Parse edilmiş", parsedData)

                setVans(parsedData)
            } else {
                console.log("Henüz veri yok")
            }


        })
    }, [])

    function handleInputToggle() {
        setInputModalVisible(!inputModalVisible)
    }

    async function vanSave(vanTitle, vanPrice, base64Image, userEmail) {

        try {
            // 2️⃣ Realtime Database objesi
            const newCaravan = {
                title: vanTitle,
                price: vanPrice,
                photos: base64Image,
                email: userEmail
                // createdAt: database.ServerValue.TIMESTAMP,
            };
            // 3️⃣ Realtime Database’e kaydet
            database().ref('Vans').push(newCaravan);
            console.log('Caravan başarıyla kaydedildi!', newCaravan);
        } catch (error) {
            console.log('Hata:', error);
        }
        handleInputToggle()
    }



    function toDetails(id) {
        navigation.navigate("VanDetails", id)
    }



    function renderVans({ item }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("VanDetails", item.id)}>
                <Card
                    item={item}
                // photos={item.photos}
                // title={item.title}
                // price={item.price}
                // onpress={toDetails(item.id)}
                />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            //  marginHorizontal: 18,
            backgroundColor: "white",
            
        }}>
            {/* <Icon
                name="logout"
                size={26}
                style={{ marginRight: 7, left: 363 }}
                onPress={() => getAuth().signOut()}
            /> */}


            <View style={{ top: 11 }}>

                <View style={{flexDirection : "row"}}>
                    <View>
                        <View style={{
                            flexDirection: "row", alignItems: "center",
                            marginLeft: 21,
                        }}>
                            <Text
                                style={{
                                    fontSize: 17,
                                    color: "#8792ad"
                                }}
                            >Your location</Text>
                            <Icon name="keyboard-arrow-down" size="38" color="#8792ad" />
                        </View>

                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "600",
                                color: "#192252",
                                marginLeft: 21,
                                marginBottom: 3

                            }}
                        >London, UK</Text>
                    </View>

                    <Icon name="search" size={22} style={{top : 13, left : 190}}/>

                </View>

                {/* <Card title={"Card"} price={12} /> */}
                <FlatList
                    data={vans}
                    renderItem={renderVans}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
                <ContentInputModal
                    visible={inputModalVisible}
                    onClose={handleInputToggle}
                    onSend={vanSave}
                />
            </View>
             <FloatingButton icon={"plus"} onPress={handleInputToggle} /> 
        </SafeAreaView>
    )
}

export default Home

