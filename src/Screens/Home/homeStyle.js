import { StyleSheet } from "react-native";

export default StyleSheet.create({
      separator: {
    height: 1,              // Çizgi kalınlığı
    backgroundColor: 'BLACK', // Çizgi rengi
    marginHorizontal: 15,    // Kenarlardan boşluk
  },

     lottieContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        justifyContent:'center',
        alignItems:'center',
        zIndex:1,


        // top: '50%',
        // left: '50%',
        //transform: [{ translateX: -50 }, { translateY: -50 }],
    },
})