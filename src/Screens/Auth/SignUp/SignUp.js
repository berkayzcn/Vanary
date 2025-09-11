import { useState } from "react"
import { Text, TextInput, View, TouchableOpacity } from "react-native"
import style from "./Style"
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { createUserWithEmailAndPassword, getAuth, updateProfile, GoogleAuthProvider, signInWithCredential } from "@react-native-firebase/auth"
import { appleAuth, AppleButton } from "@invertase/react-native-apple-authentication";


import Button from "../../../Components/Button"
import Button2 from "../../../Components/Button2";
import { showMessage, hide } from "react-native-flash-message";



GoogleSignin.configure({
    webClientId: '668372703910-gff6ttlvthrabveupuh0iccc5e2sn67p.apps.googleusercontent.com', // Firebase Console → Authentication → Sign-in method → Google → Web client ID
});

function Signup({ navigation }) {

    const [fullName, setFullname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    async function createAccount() {

        if (!fullName || !email || !password) {
            showMessage({
                message: "Eksik yada hatalı giriş yaptınız",
                type: "danger"
            })
            return
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password)
            await updateProfile(userCredential.user, {
                displayName: fullName,
            });
            console.log("Kullanıcı oluşturuldu ve isim kaydedildi:", fullName);


        } catch (error) {
            console.log(error)
        }
    }

    // async function SignIn() {
    //     await signInWithEmailAndPassword(getAuth(), email, password)
    //     navigation.navigate('MainTabs')
    // }

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
        // <View style={style.container}>
        //     <Text>SignUp Syafası</Text>
        //     <TextInput autoCapitalize="false" style={style.butonContainer} placeholder="Your full name" onChangeText={reSetPassword}/>
        //     <TextInput style={style.butonContainer} placeholder="Your email adress" onChangeText={setEmail} autoCapitalize="false"/>
        //     <TextInput autoCapitalize="false" style={style.butonContainer} placeholder="Your password" onChangeText={setPassword}/>
        //     <Button title={"Kaydol"} onPress={createAccount}/>
        // </View>

        <View style={style.container}>
            <View style={style.innerContainer}>

                <Text style={style.title}>Nice to know you !</Text>
                <Text style={style.continueText}>It's your first time to use vanary</Text>

                <View style={style.fullNameContainer}>
                    <Text style={style.fullName}>Full Name</Text>
                    <TextInput autoCapitalize="false" style={style.inputContainer} placeholder="Your full name" onChangeText={setFullname} />
                </View>
                <View style={style.emailContainer}>
                    <Text style={style.email}>Email adress</Text>
                    <TextInput autoCapitalize="false" style={style.inputContainer} placeholder="Your email adress" onChangeText={setEmail} />
                </View>

                <View>
                    <Text style={style.password}>Password</Text>
                    <TextInput autoCapitalize="false" style={style.inputContainer} placeholder="Your password" onChangeText={setPassword} />
                </View>

                <View style={{ alignItems: "center", margin: 13 }}>

                    <Button2 title={"Register"} onPress={createAccount} />
                </View>

                {/* <Button title={"SignIn"} onPress={SignIn} /> */}
                {/* <Button title={"Create account"} onPress={() => navigation.navigate("Signup")} /> */}


                <View style={{ flexDirection: "row", marginVertical: 33, justifyContent: "center" }}>

                    <Text style={{ color: "#e6edf8" }}>
                        ──────
                    </Text>

                    <Text style={{ marginHorizontal: 5, color: "#192252" }}>
                        or register with
                    </Text>

                    <Text style={{ color: "#e6edf8" }}>
                        ──────
                    </Text>
                </View>

                <View style={style.buttonContainer}>
                    <Button onPress={onGoogleButtonPress} imageRequire={require("./../../../Assets/googleIcon.png")} />
                    <Button iconName={"apple"} />

                </View>

                <View style={style.registerTextContainer}>
                    <Text style={style.registerText}>Already has vanary acccount ? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Onboarding")}>
                        <Text style={style.registerButton}>Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}
export default Signup