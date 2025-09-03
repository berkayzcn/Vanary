import { Text, TextInput, View } from "react-native";
import Button from "../../../Components/Button";
import style from "./style";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "@react-native-firebase/auth";

function LogIn({ navigation }) {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    async function SignIn() {
        await signInWithEmailAndPassword(getAuth(), email, password)
        navigation.navigate('MainTabs')
    }

    return (
        <View style={style.container}>
            <Text>Login Sayfası</Text>
            <TextInput autoCapitalize="false" style={style.inputContainer} placeholder="Email" onChangeText={setEmail} />
            <TextInput autoCapitalize="false" style={style.inputContainer} placeholder="Password" onChangeText={setPassword} />

            <Button title={"SignIn"} onPress={SignIn} />
            <Button title={"Create account"} onPress={() => navigation.navigate("Signup")} />
        </View>
    )
    
}

export default LogIn;