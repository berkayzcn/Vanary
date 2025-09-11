import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        backgroundColor: "white",
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        // justifyContent : "center"
    },

    innerContainer : {
        alignItems : "center",
        top : 94,
        flex : 1
    },
    imageContainer: {
        //  flex: 1,
        // backgroundColor: "#dcdddf",
        alignItems: "center",
        // marginBottom : 22
        // backgroundColor : "red",

    },

    imagebg: {
        flex: 1,
    },

    image: {
        width: 340,
        height: 300,
        // resizeMode: "center",
        borderRadius: 34,
         backgroundColor : "red",
         borderWidth : 1,
         borderColor : "#e6edf8"
        // padding: 14
        // marginHorizontal : 45,
        // marginVertical: 19,
        // top : 180,
        // resizeMode: "repeat",
        // resizeMode: "stretch",
        // backgroundColor: "white"
        
    },
    buttonContainer: {
        flexDirection: "row",
        // alignItems : "center",
        justifyContent: "center",
        //top : 184
    },

    titleFirstLine: {
        fontSize: 25,
        // color: "white",
        // color: "#232c5a",
        color: "#192252",
        fontWeight: "bold",
        marginTop : 5,
        left : 14

        //fontFamily: "Helvetica",
        //fontFamily: "Cochin",
        //fontFamily: "Menlo"
        // fontFamily : "italic"

    },
    titleSecondLine: {
        // color : "white",
        fontSize: 18,
        // paddingVertical: 12,
        fontWeight : "200",
        color: "#232c5a",
        color: "#192252",
        marginBottom : 9,
        left : 14
    },

    registerTextContainer: {
        flexDirection: "row",
        marginVertical : 28
    },

    registerText : {
        color: "grey",

    },
    registerButton: {
        fontWeight: "bold",
        color: "#192252",
    },
    

    continueText : {
        
    }


})