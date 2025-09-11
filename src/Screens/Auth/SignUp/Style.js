// import { StyleSheet } from "react-native";

// export default StyleSheet.create({


//     container : {
//         flex : 1,
//         justifyContent : "center",
//         // alignItems : "center"
//         marginHorizontal : 14
//     },

//     butonContainer : {
//         borderWidth : 1,
//         borderRadius : 6,
//         padding : 10,
//         margin : 4
//     },

// })

import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems : "center",
        // marginHorizontal : 14,
        backgroundColor: "white"

    },

    innerContainer: {
        // marginHorizontal: 20,
        margin: 29,
        top: 12
        // marginVertical : 32
    },

    emailContainer: {
        // marginVertical : 25
        marginBottom: 25

    },

    fullNameContainer: {
        marginVertical: 25

    },
    fullName: {
        color: "#192252",
        // fontFamily : "italic"
        //fontFamily: "Helvetica-bold",
        //  fontWeight : "bold",
        fontWeight: "600",
        marginBottom: 4,
    },

    email: {
        // left: 4,
        color: "#192252",
        // fontFamily : "italic"
        //fontFamily: "Helvetica-bold",
        //  fontWeight : "bold",
        fontWeight: "600",
        marginBottom: 4,
        //marginTop : 22

    },

    password: {
        // left: 4,
        color: "#192252",
        fontWeight: "600",
        marginBottom: 4

    },

    inputContainer: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 12,
        margin: 4,
        borderColor: "grey",
        borderColor: "#e6edf8",
    },
    title: {
        fontSize: 32,
        // fontFamily : "",
        fontWeight: "500",
        color: "#192252",

    },

    continueText: {
        color: "grey",
        marginTop: 10
    },

    buttonContainer: {
        flexDirection: "row",
        // alignItems : "center",
        justifyContent: "center",
        //top : 184
    },


    registerTextContainer: {
        flexDirection: "row",
        marginVertical: 28,
        justifyContent: "center"
    },

    registerText: {
        color: "grey",

    },
    registerButton: {
        fontWeight: "bold",
        color: "#192252",
    },




})