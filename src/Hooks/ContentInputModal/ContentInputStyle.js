import { Dimensions, StyleSheet } from "react-native";

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: deviceSize.height / 1.6,
    },


    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },

    inputContainer: {
        flex: 1,
        margin: 7,
        top: 25
    },

    title: {
        fontSize: 25
    },
    title2: {
        fontWeight: "bold",
        fontSize: 25
    },

    titleContainer: {
        marginTop: 5
    },

    dayBox: {
       
        margin: 4,
        padding : 18,
        borderRadius: 58,
        borderWidth: 1,
        borderColor: "#ccc",
        textAlign: "center",
        color: "#333"
    },
    dayBoxSelected: {
        backgroundColor: "#4CAF50",
        color: "#fff",
        borderColor: "#4CAF50",
        backgroundColor: 'rgba(74, 144, 226, 1)',

    },
    daysContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 25
    }
})