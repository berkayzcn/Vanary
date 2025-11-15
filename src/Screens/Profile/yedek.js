// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { getAuth } from "@react-native-firebase/auth";
import ProfileCard from "../../Components/ProfileCard";
import { useEffect, useState } from "react";
import database from "@react-native-firebase/database"
import useParseData from "../../Hooks/useParseData/useParseData";
import Card from "../../Components/VanCard";
import VanEditModal from "../../Components/VanEditModal";
import SegmentedControl from "@react-native-segmented-control/segmented-control";


function Profile() {

  const currentUser = getAuth().currentUser
  const userName = currentUser.displayName
  const [vans, setVans] = useState();
  const [sentOffers, setSentOffers] = useState([]);
  const [selectedVan, setSetSelectedVan] = useState()
  const [editModalVisible, setEditModalVisible] = useState()
  const [selectedIndex, setSelectedIndex] = useState(0); // 0 = Listings, 1 = Offers


  function openEditMdodal(van) {
    setSetSelectedVan(van)
    setEditModalVisible(true)
  }

  useEffect(() => {
    // const vansRef = database().ref(`Vans/${currentUser}`)
    const vansRef = database()
      .ref("Vans")
      .orderByChild("email")
      .equalTo(currentUser.email)

    const onValueChange = vansRef.on('value', snapshot => {
      const contentData = snapshot.val();
      if (contentData) {
        console.log("Bu ilk şekli", contentData)
        const parsedData = useParseData(contentData)
        console.log("Parse edilmiş", parsedData)
        setVans(parsedData)
      } else {
        setVans([])
      }



    })

  }, [])


  // const userName = currentUser ? currentUser.split("@")[0] : "Misafir"

  useEffect(() => {
    const vansRef = database().ref("Vans");

    const onValueChange = vansRef.on("value", snapshot => {
      const contentData = snapshot.val();

      if (contentData) {
        const parsedData = useParseData(contentData); // [{id, ...}, {...}]

        // Sadece currentUser’ın teklif verdiği vanları filtrele
        const filtered = parsedData.filter(van =>
          van.Offers &&
          Object.values(van.Offers).some(offer => offer.email === currentUser.email)
        );

        setSentOffers(filtered);
      } else {
        setSentOffers([]);
      }
    });

    //   return () => vansRef.off("value", onValueChange);
  }, []);


  function renderVans({ item }) {
    return (
      // <TouchableOpacity onPress={() => navigation.navigate("VanDetails", item.id)}>
      <TouchableOpacity >
        <Card
          item={item}
          edit={() => openEditMdodal(item)}
          pressDelete={() => deleteVan(item.id)}
        // photos={item.photos}
        // title={item.title}
        // price={item.price}
        // onpress={toDetails(item.id)}
        />
      </TouchableOpacity>
    )
  }

  function renderOfferedVans({ item }) {
    return (
      // <TouchableOpacity onPress={() => navigation.navigate("VanDetails", item.id)}>
      <TouchableOpacity >
        <Card
          item={item}
        />
      </TouchableOpacity>
    )
  }



  function updateVan(vanId, vanText, vanPrice) {
    database().ref(`Vans/${vanId}`).update({
      // newprice : vanPrice,
      // newtitle : vanText
      //databasede kayıtlı olan isimle kaydetmezsen yeni bir obje oluşturur
      //fakat aynı isimde kayıt aşlırsan olanı güncellerr
      title: vanText,
      price: vanPrice
    })
    setEditModalVisible(false)
  }


  function deleteVan(vanId) {
    database().ref(`Vans/${vanId}`).remove()
  }


  return (
    <View>
      <ProfileCard item={currentUser} />

      {/* Segment Control */}

      <View>
        <SegmentedControl
          values={['My Listings', 'My Offers']}
          selectedIndex={selectedIndex}
          onChange={(event) =>
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex)
          }
          tintColor="#d4af37" // altın rengi
          fontStyle={{ color: "black" }}
          activeFontStyle={{ color: "black", fontWeight: "600" }}
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

      {/* <Text
        style={{
          marginLeft: 13,
          // fontWeight
        }}
      >Vanlarım</Text>
      <FlatList
        data={vans}
        renderItem={renderVans}
      />

      <Text style={{ fontSize: 13 }}>Teklif Verdiklerim</Text>

      <FlatList
        data={sentOffers}
        renderItem={renderOfferedVans}
      /> */}

      <VanEditModal
        visible={editModalVisible}
        oncClose={() => setEditModalVisible(false)}
        van={selectedVan}
        send={updateVan}
      />

    </View>
  )
}

export default Profile;
