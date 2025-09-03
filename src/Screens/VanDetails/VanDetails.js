import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import database from "@react-native-firebase/database";
import DetailsCard from "../../Components/DetailsCard.js";
import OfferModal from "../../Hooks/OfferModal/OfferModal.js";
import Button from "../../Components/Button/Button.js";

const VanDetails = ({ route }) => {
    const id = route.params;   // çünkü id’yi direkt parametre olarak gönderdin
    const [item, setItem] = useState(null);
    const [offerVisible, setOfferVisible] = useState()

    useEffect(() => {
        const ref = database().ref(`Vans/${id}`);  // ilgili id'nin datası
        const listener = ref.on("value", snapshot => {
            if (snapshot.exists()) {
                setItem(snapshot.val());
            }
        });
    }, [id]);

    if (!item) {
        return (
            <View>
                <Text>Yükleniyor...</Text>
            </View>
        );
    }

    function handleInputToggle() {
        setOfferVisible(!offerVisible)
    }

    function saveOffer(vanOffer) {
        const offers = {
            offer: vanOffer,
        }
        // database().ref(`Vans/${id}`).push(vanOffer) bu şekilde 
        database().ref(`Vans/${id}/Offer`).push(vanOffer) //bu şekilde offer diye bir alt başlıl altında yapıyor
        handleInputToggle()
    }

    return (
        <View>
            <DetailsCard title={item.title} price={item.price} photos={item.photos} press={handleInputToggle} />
            <OfferModal
                visible={offerVisible}
                onClose={handleInputToggle}
                onSend={saveOffer}
            />
        </View>
    );
};

export default VanDetails;
