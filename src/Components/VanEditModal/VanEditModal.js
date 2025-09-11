import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from 'react-native-modal';
import styles from "./VanModalStyle"
import { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";


function VanEditModal({ visible, oncClose, send, van }) {

    // const [vans, setVans] = useState([])
    const [vansTitle, setVansTitle] = useState()
    //const [newTitle, setNewTitle] = useState()
    const [vanPrice, setPrice] = useState()

    useEffect(() => {
        if (van) {
            setVansTitle(van.title);
            setPrice(van.price)
            console.log("edit e gelen van", van)
        }
    }, [van]);

    return (
        <Modal
            isVisible={visible}
            onSwipeComplete={oncClose}
            onBackdropPress={oncClose}
            swipeDirection={"down"}
            style={styles.modal}
        >
            <View style={styles.container}>
                <Text>Edit Van Details</Text>
                <TextInput
                    placeholder={"Edit Title"}
                    value={vansTitle}
                    onChangeText={setVansTitle}
                />
                <TextInput
                    placeholder="New Price"
                    value={vanPrice}
                    onChangeText={setPrice}
                />

                <TouchableOpacity onPress={oncClose}>
                    <Text>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> send(van.id, vanPrice, vansTitle)}>
                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default VanEditModal;