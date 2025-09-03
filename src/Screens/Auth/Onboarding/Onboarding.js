import { Image, ImageBackground, SafeAreaView, View } from "react-native"
import style from "./style"
import Button from "../../../Components/Button"
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { appleAuth, AppleButton } from "@invertase/react-native-apple-authentication";

GoogleSignin.configure({
    webClientId: '668372703910-gff6ttlvthrabveupuh0iccc5e2sn67p.apps.googleusercontent.com', // Firebase Console → Authentication → Sign-in method → Google → Web client ID
});

function Onboarding({ navigation }) {

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

        <ImageBackground
            source={require("./../../../Assets/bg4.jpeg")}
            style={style.imagebg}
        >

            <View style={style.container}>


                <View style={style.imageContainer}>
                    <Image
                        style={style.image}
                        source={require("./../../../Assets/Hyper.png")} />
                </View>

                <View style={style.buttonContainer}>

                    <Button title={"Google"} onPress={onGoogleButtonPress} />
                    
                    <AppleButton
                        buttonStyle={AppleButton.Style.WHITE}
                        buttonType={AppleButton.Type.SIGN_IN}
                        style={{
                            width: 160,
                            height: 45,
                        }}
                        onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
                    />
                </View>
                <Button title={"Home a git"} onPress={() => navigation.navigate("MainTabs")} />
                <Button title={"Giriş Yap"} onPress={toEmailLogin} />
            </View>
            <Button title={"Profile a git"} onPress={() => navigation.navigate("Profile")} />


        </ImageBackground>


    )
}

export default Onboarding