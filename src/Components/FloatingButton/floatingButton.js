// import { Text, TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons"
// import Style from "./floatingButtonStyle"


// function FloatingButton ({icon, onPress}) {
//     return(
//         <TouchableOpacity onPress={onPress} style={Style.container}>
//             <Icon name={icon} size={28} color='white'/> 
//         </TouchableOpacity>
//     )
// }

// export default FloatingButton;

import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient"; // 🌈 eklendi
import Style from "./floatingButtonStyle";

function FloatingButton({ icon, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={Style.container}>
      <LinearGradient
        // colors={['#FF8C00', '#FF0080']} // 💫 gradient renklerini buradan değiştir
        // colors={['#199970', '#455D64', '#8E96E9']}
        // colors={['#DCD0FB', '#2B3277']}
         colors={['#D0011A', '#0D73BC', '#292D34']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={Style.gradient}
      >
        <Icon name={icon} size={28} color="white" />
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default FloatingButton;
