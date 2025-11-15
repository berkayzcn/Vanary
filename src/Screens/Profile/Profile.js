


import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { getAuth } from "@react-native-firebase/auth";
import ProfileCard from "../../Components/ProfileCard";
import { useEffect, useState } from "react";
import database from "@react-native-firebase/database";
import useParseData from "../../Hooks/useParseData/useParseData";
import Card from "../../Components/VanCard";
import VanEditModal from "../../Components/VanEditModal";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import Loading from "../../Components/Loading";

function Profile() {
  const currentUser = getAuth().currentUser;
  const [vans, setVans] = useState([]);
  const [sentOffers, setSentOffers] = useState([]);
  const [selectedVan, setSelectedVan] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); // 0 = Listings, 1 = Offers

  function openEditModal(van) {
    setSelectedVan(van);
    setEditModalVisible(true);
  }

  // 🔹 Kullanıcının kendi ilanlarını çek
  useEffect(() => {
    const vansRef = database()
      .ref("Vans")
      .orderByChild("email")
      .equalTo(currentUser.email);

    const onValueChange = vansRef.on("value", (snapshot) => {
      const contentData = snapshot.val();
      if (contentData) {
        const parsedData = useParseData(contentData);
        setVans(parsedData);
      } else {
        setVans([]);
      }
    });

    return () => vansRef.off("value", onValueChange);
  }, []);

  // 🔹 Kullanıcının teklif verdiği vanları çek
  useEffect(() => {
    const vansRef = database().ref("Vans");

    const onValueChange = vansRef.on("value", (snapshot) => {
      const contentData = snapshot.val();
      if (contentData) {
        const parsedData = useParseData(contentData);
        const filtered = parsedData.filter(
          (van) =>
            van.Offers &&
            Object.values(van.Offers).some(
              (offer) => offer.email === currentUser.email
            )
        );
        setSentOffers(filtered);
      } else {
        setSentOffers([]);
      }
    });

    return () => vansRef.off("value", onValueChange);
  }, []);

  function renderVans({ item }) {
    return (
      <TouchableOpacity>
        <Card
          item={item}
          edit={() => openEditModal(item)}
          pressDelete={() => deleteVan(item.id)}
        />
      </TouchableOpacity>
    );
  }

  function renderOfferedVans({ item }) {
    return (
      <TouchableOpacity>
        <Card item={item} />
      </TouchableOpacity>
    );
  }

  function updateVan(vanId, vanText, vanPrice) {
    database().ref(`Vans/${vanId}`).update({
      title: vanText,
      price: vanPrice,
    });
    setEditModalVisible(false);
  }

  function deleteVan(vanId) {
    database().ref(`Vans/${vanId}`).remove();
  }

  return (
    <View style={{ flex: 1, backgroundColor : 'white' }}>
      <ProfileCard item={currentUser} />

      {/* <Loading/> */}

      {/* 🔹 Segment Control */}
      <View style={{ marginHorizontal: 16, marginTop: 16 }}>
        <SegmentedControl
          values={["My Listings", "My Offers"]}
          selectedIndex={selectedIndex}
          onChange={(event) =>
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
          }
          // tintColor="#d4af37" // altın rengi
          tintColor="rgba(41, 82, 203)" // altın rengi
          fontStyle={{ color: "black" }}
          activeFontStyle={{ color: "white", fontWeight: "600" }}
        />
      </View>

      {/* 🔹 İçerik - Seçili sekmeye göre liste */}
      <View style={{ marginTop: 16, flex: 1 }}>
        {selectedIndex === 0 ? (
          <FlatList
            data={vans}
            renderItem={renderVans}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <FlatList
            data={sentOffers}
            renderItem={renderOfferedVans}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      <VanEditModal
        visible={editModalVisible}
        oncClose={() => setEditModalVisible(false)}
        van={selectedVan}
        send={updateVan}
      />
    </View>
  );
}

export default Profile;
