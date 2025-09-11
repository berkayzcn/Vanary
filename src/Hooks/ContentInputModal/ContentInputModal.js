import { FlatList, Image, ScrollView, Text, TextInput, View } from "react-native";
import Styles from "./ContentInputStyle"
import { useState } from "react";
// import Button from "../../Button";
import Button from "../../Components/Button";
import Modal from 'react-native-modal';
import { launchImageLibrary } from "react-native-image-picker";
import { getAuth } from "@react-native-firebase/auth";


function ContentInputModal({ visible, onClose, onSend }) {

  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [imageUri, setImageUri] = useState([]);
  const [debugInfo, setDebugInfo] = useState(null);

  const userEmail = getAuth().currentUser.email
  console.log(userEmail)



  const selectImages = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 10, // max 10 foto
      includeBase64: true, // 🔹 Base64 datası gelsin
    });

    console.log("📷 RAW RESULT:", result);
    setDebugInfo(JSON.stringify(result, null, 2)); // debug için ekrana yaz

    if (result.didCancel) {
      console.log('Kullanıcı iptal etti');
      return;
    }

    if (result.errorCode) {
      console.log('Hata:', result.errorMessage);
      return;
    }

    if (result.assets && result.assets.length > 0) {
      // Tüm gelen asset'leri logla
      // result.assets.forEach((asset, index) => {
      //   console.log(`➡️ Asset ${index}:`, asset);
      // });

      // Base64 string’leri al
      const base64Images = result.assets
        .map(asset => asset.base64)
        .filter(Boolean);

      setImageUri(base64Images); // 🔹 artık state’de base64 array var
    }
  };


  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      style={Styles.modal}
      swipeDirection={"down"}
    >
      <View style={Styles.container}>
        <View style={Styles.inputContainer}>
          <Text style={Styles.title}>Let's personalize </Text>
          <Text style={Styles.title2}>Add Caravan</Text>
          <TextInput
            placeholder="Caravan Name"
            onChangeText={setName}
            multiline
            style={{
              // flex: 1,
              paddingTop: 24
            }}
          />

          <TextInput
            placeholder="Price"
            onChangeText={setPrice}
            multiline
            style={{
              // flex: 1,
              paddingTop: 24
            }}
          />
          <Text>______________________________________________</Text>


        </View>


        <FlatList
          data={imageUri}
          // keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: `data:image/jpeg;base64,${item}` }} //base64 ile gösterim
              style={{
                width: 100,
                height: 100,
                margin: 5,
                borderRadius: 8,
              }}
            />
          )}
          numColumns={3} // grid görünüm
          contentContainerStyle={{ marginTop: 20 }}
        />

        {/* Debug çıktısını göster */}
        {/* {debugInfo && (
        <ScrollView style={{marginTop: 20, maxHeight: 200}}>
          <Text style={{fontSize: 12}}>{debugInfo}</Text>
        </ScrollView>
      )} */}


        <Button buttonText={'Foto sec'} theme={"primary"} onPress={selectImages} />
        <Button buttonText={'Create new habit'} theme={"primary"} onPress={() => onSend(name, price, imageUri, userEmail)} />
      </View>
    </Modal>
  )
}

export default ContentInputModal;
