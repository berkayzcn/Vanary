import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../../../Components/Button";
import style from "./style";
import { useState } from "react";
// import { getAuth, signInWithEmailAndPassword } from "@react-native-firebase/auth";
import Button2 from "../../../Components/Button2";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithCredential } from '@react-native-firebase/auth';
import { appleAuth, AppleButton } from "@invertase/react-native-apple-authentication";
import { showMessage, hide } from "react-native-flash-message";

function LogIn({ navigation }) {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    async function SignIn() {
        if (!email || !password) {
            showMessage({
                message: "Eksik yada hatalı giriş yaptınız",
                type: "danger"
            })
            return
        }
        await signInWithEmailAndPassword(getAuth(), email, password)
        navigation.navigate('MainTabs')
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

    return (
        <View style={style.container}>
            <View style={style.innerContainer}>

                <Text style={style.title}>Welcome to, Vanary</Text>
                <Text style={style.continueText}>Enter your Vanary account to continue</Text>
                <View style={style.emailContainer}>
                    <Text style={style.email}>Email adress</Text>
                    <TextInput autoCapitalize="false" style={style.inputContainer} placeholder="Email" onChangeText={setEmail} />
                </View>

                <View>
                    <Text style={style.password}>Password</Text>
                    <TextInput autoCapitalize="false" style={style.inputContainer} placeholder="Password" onChangeText={setPassword} />
                </View>

                <View style={{ alignItems: "center", margin: 13 }}>

                    <Button2 title={"Login"} onPress={SignIn} />
                </View>

                {/* <Button title={"SignIn"} onPress={SignIn} /> */}
                {/* <Button title={"Create account"} onPress={() => navigation.navigate("Signup")} /> */}


                <View style={{ flexDirection: "row", marginVertical: 33, justifyContent: "center" }}>

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

                    <Text style={style.registerText}>Didn't have a vanary account ? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={style.registerButton}>Register</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )

}

export default LogIn;