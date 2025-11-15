import { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialIcons";
import Button2 from "../../Components/Button2";
import style from "./OfferModalStyle";

function OfferModal({ onClose, visible, onSend }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const handleDayPress = (day) => {
    // Eğer başlangıç tarihi seçilmemişse veya secim tamamlanmisa → başlat
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
      setMarkedDates({
        [day.dateString]: { startingDay: true, color: "#192252", textColor: "white" },
      });
    }
    // Eğer sadece başlangıç tarihi varsa → bitiş tarihini ayarla
    else if (startDate && !endDate) {
      const start = new Date(startDate);
      const end = new Date(day.dateString);
      if (end < start) {
        // Kullanıcı yanlış sırayla seçerse, yeniden başlat
        setStartDate(day.dateString);
        setMarkedDates({
          [day.dateString]: { startingDay: true, color: "#192252", textColor: "white" },
        });
        return;
      }

      setEndDate(day.dateString);
      // Aralıktaki tüm günleri işaretle
      const range = {};
      let tempDate = new Date(start);
      while (tempDate <= end) {
        const dateStr = tempDate.toISOString().split("T")[0];
        range[dateStr] = {
          color: "#8792ad",
          textColor: "white",
        };
        tempDate.setDate(tempDate.getDate() + 1);
      }
      range[startDate] = { startingDay: true, color: "#192252", textColor: "white" };
      range[day.dateString] = { endingDay: true, color: "#192252", textColor: "white" };
      setMarkedDates(range);
    }
  };

  const handleConfirm = () => {
    if (startDate && endDate) {
      onSend(startDate, endDate);
      onClose();
    } else {
      alert("Lütfen tarih aralığını seçiniz.");
    }
  };

  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      style={style.modal}
      swipeDirection={"down"}
    >
      <View style={style.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 3,
            padding: 6,
            marginTop: 24,
            marginBottom: 14,
            marginHorizontal: 12,
          }}
        >
          <Icon name="calendar-month" size={23} color="#8792ad" />
          <Text style={{ color: "grey", marginLeft: 6 }}>
            {startDate && endDate
              ? `${startDate} → ${endDate}`
              : "Start and end dates"}
          </Text>
        </View>

        <Calendar
          onDayPress={handleDayPress}
          markingType={"period"}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: "#192252",
            todayTextColor: "#192252",
            arrowColor: "#192252",
            monthTextColor: "#192252",
          }}
        />

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Button2 title={"Request to Book"} onPress={handleConfirm} />
        </View>
      </View>
    </Modal>
  );
}

export default OfferModal;



// ilk hali

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