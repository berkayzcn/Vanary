import { useState } from "react"
import { Text, TextInput, View } from "react-native"
import style from "./Style"
import { createUserWithEmailAndPassword, getAuth } from "@react-native-firebase/auth"
import Button from "../../../Components/Button"

function Signup () {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [repassword, reSetPassword] = useState()

   async function createAccount() {
    try{

        await createUserWithEmailAndPassword(getAuth(), email, password )
        console.log("Kullanıcı oluşturuldu")
    }catch(error){
        console.log(error)
    }
    }

    return(
        <View style={style.container}>
            <Text>SignUp Syafası</Text>
            <TextInput style={style.butonContainer} placeholder="email" onChangeText={setEmail} autoCapitalize="false"/>
            <TextInput autoCapitalize="false" style={style.butonContainer} placeholder="password" onChangeText={setPassword}/>
            <TextInput autoCapitalize="false" style={style.butonContainer} placeholder="repassword" onChangeText={reSetPassword}/>
            <Button title={"Kaydol"} onPress={createAccount}/>
        </View>
    )
}
export default Signup