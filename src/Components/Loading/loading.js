import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

function Loading() {

    return (

        <LottieView
            style={{
                width: 400,
                height: 500,
            }}
            source={require('../../Assets/loading.json')} autoPlay
        />

        
    )
}


export default Loading;