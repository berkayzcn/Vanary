import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Card from "../../Components/VanCard";
import FloatingButton from "../../Components/FloatingButton";
import ContentInputModal from "../../Hooks/ContentInputModal";
import { useEffect, useState } from "react";
import database from "@react-native-firebase/database"
import useParseData from "../../Hooks/useParseData/useParseData";
import storage from '@react-native-firebase/storage';

function Home({ navigation }) {

    const [inputModalVisible, setInputModalVisible] = useState()
    const [vans, setVans] = useState();

    useEffect(() => {
        const vansRef = database().ref('Vans')

        const onValueChange = vansRef.on('value', snapshot => {
            const contentData = snapshot.val();
            if (contentData) {
                console.log("Bu ilk şekli", contentData)
            }

            const parsedData = useParseData(contentData)
            console.log("Parse edilmiş", parsedData)

            setVans(parsedData)

        })
    }, [])

    function handleInputToggle() {
        setInputModalVisible(!inputModalVisible)
    }

    async function vanSave(vanTitle, vanPrice, base64Image) {
        try {
            // 2️⃣ Realtime Database objesi
            const newCaravan = {
                title: vanTitle,
                price: vanPrice,
                photos: base64Image,
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
                    photos={item.photos}
                    title={item.title}
                    price={item.price}
                // onpress={toDetails(item.id)}
                />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 18 }}>

            <View>
                <Text>
                    Hello, Home Page
                </Text>
                <Card title={"Card"} price={12} />
                <FlatList
                    data={vans}
                    renderItem={renderVans}
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