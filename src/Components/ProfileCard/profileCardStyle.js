import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container : {
        borderWidth : 1,
        margin : 7,
        padding : 27,
        marginVertical : 12,
        marginHorizontal : 19,
        justifyContent : "center",
        alignItems : "center",
        borderColor : "gray",
        flexDirection : "row",
        borderRadius : 16,
        backgroundColor : "#5d85ee"
    },

    image : {
        width : 70,
        height : 70,
        // borderWidth : 15
        borderRadius : 56
    },

    username : {
        color : "white",
        fontSize : 19,
        fontWeight : 500
    },

    email : {
        color : "white",
        fontWeight : 200
    }
})