import { Pressable,Button, Text} from "react-native"
import { styles } from "./styles";
import { TextInput, View } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "./firebase.js"
export const LoginPage = ({navigation}) => {
	const auth = getAuth()
	const [email, setEmail] = useState("")
	const [pswd, setPswd] = useState("")
	const firebase_login = async() => {
		await signInWithEmailAndPassword(auth, email, pswd)
		.then(() => {
			navigation.navigate("Home")
		})
		.catch((error) => {
			console.log(error)
			console.log(error.code)
			console.log(error.message)

		})
	}

	return (
		<View style={styles.mybox}>
		<View className="loginform" style={styles.form}>
		<TextInput placeholder="Username" autoComplete="email" value={email} style={styles.username} onChangeText={setEmail} inputMode="email"/>
		<TextInput placeholder="Password" value={pswd} autoComplete="current-password" onChangeText={setPswd} style={styles.pswd} secureTextEntry/>
		<Pressable onPress={firebase_login}>
		<Text>Enter</Text>
		</Pressable>
		<Text>{"\n"}</Text>
		<Pressable>
		<Text style={{fontSize: 12}} onPress={()=> navigation.navigate("Register")}>Create account?</Text>
		</Pressable>
		</View>
		</View>
	)
}
