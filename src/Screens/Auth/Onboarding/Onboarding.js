import { Image, ImageBackground, SafeAreaView, Text, TouchableOpacity, View, Animated } from "react-native"
import style from "./style"
import Button from "../../../Components/Button"
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { appleAuth, AppleButton } from "@invertase/react-native-apple-authentication";
import Button2 from "../../../Components/Button2";
import { useEffect, useRef } from "react";

GoogleSignin.configure({
    webClientId: '668372703910-gff6ttlvthrabveupuh0iccc5e2sn67p.apps.googleusercontent.com', // Firebase Console → Authentication → Sign-in method → Google → Web client ID
});

function Onboarding({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;//0 tamamen gorunmez
    const fadeAnim2 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1, // tamamen görünür
            duration: 2000, // 2 saniyede
            useNativeDriver: true,
        }).start(() => {
            // Birinci yazı animasyonu bittikten sonra ikinci yazı
            Animated.timing(fadeAnim2, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }).start();
        });
    }, [])


    function toEmailLogin() {
        navigation.navigate("Login")
    }

    const onGoogleButtonPress = async () => {

        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const signInResult = await GoogleSignin.signIn();

        // Try the new style of google-sign in result, from v13+ of that module
        idToken = signInResult.data?.idToken;
        if (!idToken) {
            // if you are using older versions of google-signin, try old style result
            idToken = signInResult.idToken;
        }
        if (!idToken) {
            throw new Error('No ID token found');
        }

        // Create a Google credential with the token
        const googleCredential = GoogleAuthProvider.credential(signInResult.data.idToken);

        // Sign-in the user with the credential
        return signInWithCredential(getAuth(), googleCredential);
        navigation.navigate("MainTabs")
    }


    async function onAppleButtonPress() {
        // Apple Sign-In isteği
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        // Apple’dan gelen kimlik bilgilerini al
        const { identityToken, nonce } = appleAuthRequestResponse;

        if (identityToken) {
            // Firebase credential oluştur
            const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

            // Firebase’e giriş yap
            return auth().signInWithCredential(appleCredential);
        } else {
            throw new Error('Apple Sign-In başarısız: identityToken yok');
        }
    }

    return (

        // <ImageBackground
        //     source={require("./../../../Assets/bg4.jpeg")}
        //     style={style.imagebg}
        // >
        <View style={style.container}>
            <View style={style.innerContainer}>


                <View style={style.imageContainer}>
                    <Image
                        style={style.image}
                        // source={require("./../../../Assets/Hyper.png")} />
                        // source={require("./../../../Assets/VANARY7.png")} />
                        // source={require("./../../../Assets/VANARY9.png")} />
                        source={require("./../../../Assets/bg23.jpeg")} />
                </View>

                <View style={{
                    // marginHorizontal : 15,
                    // paddingHorizontal: 34,
                    // alignItems : "center",
                    marginVertical: 15,
                 
                    right: 23
                }}>

                    {/* <Text style={style.titleFirstLine}>Welcome to, Vanary </Text> */}
                    <Animated.Text style={[style.titleFirstLine, { opacity: fadeAnim }]}>
                        Welcome to Vanary
                    </Animated.Text>
                    <Animated.Text style={[style.titleSecondLine, { opacity: fadeAnim2, marginTop: 20 }]}>
                        {/* Caravans made simple: rent or share */}
                        Discover, Rent, or Share Your Caravan
                    </Animated.Text>


                    {/* <Text style={style.titleFirstLine}>Your next adventure starts here</Text> */}
                    {/* <Text style={style.titleSecondLine}>Your next adventure starts here; rent or share</Text> */}
                    {/* <Text style={style.titleSecondLine}>Caravans made simple: rent or share</Text> */}
                </View>

                {/* <View> */}

                <Button2 title={"Login"} onPress={toEmailLogin} />
                {/* <Button title={"Giriş Yap"} onPress={toEmailLogin} /> */}

                <View style={{ flexDirection: "row", marginVertical: 33 }}>

                    <Text style={{ color: "#e6edf8" }}>
                        ──────
                    </Text>

                    <Text style={{ marginHorizontal: 5, color: "#192252" }}>
                        or login with
                    </Text>

                    <Text style={{ color: "#e6edf8" }}>
                        ──────
                    </Text>
                </View>

                <View style={style.buttonContainer}>
                    <Button onPress={onGoogleButtonPress} imageRequire={require("./../../../Assets/googleIcon.png")} />
                    <Button iconName={"apple"} />

                    {/* <AppleButton
                    buttonStyle={AppleButton.Style.WHITE}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={{
                        width: 160,
                        height: 45,
                        }}
                        onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
                        /> */}
                </View>

                <View style={style.registerTextContainer}>

                    <Text style={style.registerText}>Didn't have a pikbil account ? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={style.registerButton}>Register</Text>
                    </TouchableOpacity>
                </View>
                {/* <Button title={"Home a git"} onPress={() => navigation.navigate("MainTabs")} /> */}
                {/* </View> */}
            </View>
        </View>

        // {/* <Button title={"Profile a git"} onPress={() => navigation.navigate("Profile")} /> */}


        // </ImageBackground>


    )
}

export default Onboarding