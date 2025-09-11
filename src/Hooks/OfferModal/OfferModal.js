import { useState } from "react"
import { View } from "react-native"
import Modal from "react-native-modal"
import Input from "../../Components/Input"
import Button from "../../Components/Button"
import style from "./OfferModalStyle"
import { getAuth } from "@react-native-firebase/auth"

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
                <Input placeholder={"Teklif Gir"} changeText={setPrice} />
                <Button title={"Teklif Gönder"} onPress={() => onSend(price, userEmail)} />
            </View>

        </Modal>
    )
}

export default OfferModal;