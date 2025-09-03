import { useState } from "react"
import { View } from "react-native"
import Modal from "react-native-modal"
import Input from "../../Components/Input"
import Button from "../../Components/Button"
import style from "./OfferModalStyle"

function OfferModal  ({ onClose, visible, onSend })  {

    const [price, setPrice] = useState()

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
                <Button title={"Teklif Gönder"} onPress={()=>onSend(price)} />
            </View>

        </Modal>
    )
}

export default OfferModal;