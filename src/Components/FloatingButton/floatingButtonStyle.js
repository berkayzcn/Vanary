import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        position: 'absolute',
        //absolute ekran da bir yerde bıraktı yanis abitlemez.ekranda yüzer durumda gibi.diğer cımponentlerin üzerinde durabilirde
        bottom: 40,
        right: 30,
        borderRadius: 50,
        width: 54,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        // color : "green",
        backgroundColor: "green",
        backgroundColor: 'rgba(74, 144, 226, 1)',
              borderRightWidth: 3,
                     borderBottomWidth: 3,

        zIndex: 9999,
        elevation: 10,
        
    },

    

})