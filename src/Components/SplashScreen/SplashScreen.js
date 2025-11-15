import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { View } from "react-native";



function SplashScreen({ navigation }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Onboarding'); // Ana sayfaya yönlendir
        }, 3500); // 2 saniye bekle

        return () => clearTimeout(timer);
    }, [navigation]);
    return (
        <View style={{
              
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
    
        }}>

            <LottieView
                style={{
                    width: 400,
                    height: 500,
                }}
                source={require('../../Assets/splashScreen.json')} autoPlay
            />
        </View>


    )
}


export default SplashScreen;