import { useState } from "react"
import { TouchableOpacity, View, Text } from "react-native"
import Modal from "react-native-modal"
import Input from "../../Components/Input"
import Button from "../../Components/Button"
import style from "./OfferModalStyle"
import { getAuth } from "@react-native-firebase/auth"
import Icon from "react-native-vector-icons/MaterialIcons"
import Button2 from "../../Components/Button2"


function OfferModal({ onClose, visible, onSend }) {

    const [price, setPrice] = useState()
    const userEmail = getAuth().currentUser.email
    console.log(userEmail)


    return (
        <Modal
            isVisible={visible}
            onSwipeComplete={onClose}
            onBackdropPress={onClose}
            style={style.modal}
            swipeDirection={"down"}
        >
            <View style={style.container}>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 3,
                    padding: 6,
                    marginTop: 24,
                    marginBottom : 14,
                    marginHorizontal: 12
                }}>
                    <Icon name="calendar-month" size="23" color="#8792ad" />
                    <Text style={{ color: "grey" }}>Start and end dates</Text>
                </TouchableOpacity>
                {/* <Input placeholder={"Teklif Gir"} changeText={setPrice} /> */}
                {/* <Button title={"Teklif Gönder"} onPress={() => onSend(price, userEmail)} /> */}
                <View style={{alignItems : "center"}}>

                <Button2 title={"Request to Book"} onPress={() => onSend(price, userEmail)} />
                </View>
                <Text style={{ color: "#e6edf8", textAlign : "center" }}>
                    ────────────────────────
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 17, marginTop: 5 }}>
                    <Icon name="check-circle" size="27" color="#192252" />
                    <Text style={{ marginLeft: 6 }}>gdskfgsadmg</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 17, marginTop: 5 }}>
                    <Icon name="check-circle" size="27" color="#192252" />
                    <Text style={{ marginLeft: 6 }}>gdskfgsadmg</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 17, marginTop: 5 }}>
                    <Icon name="check-circle" size="27" color="#192252" />
                    <Text style={{ marginLeft: 6 }}>gdskfgsadmg</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 17, marginTop: 5 }}>
                    <Icon name="check-circle" size="27" color="#192252" />
                    <Text style={{ marginLeft: 6 }}>gdskfgsadmg</Text>
                </View>



            </View>

        </Modal>
    )
}

export default OfferModal;