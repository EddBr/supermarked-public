import { Pressable,Text } from "react-native"
import {  signOut } from "firebase/auth"
import { getAuth } from "./firebase.js"
import { styles } from "./styles"
export default LogInOut = (props) => {
	auth = getAuth()
	if (!props.initialising){
		if (props.isAnon ){
			return (
				<Pressable style={styles.pressable}
				title="Login"
				onPress={() =>
					props.navigation.navigate('Login')
				}>
				<Text style={{color:"white"}}>
				Login
				</Text>
				</Pressable>
			)
		}
		return (
			<Pressable style={styles.pressable} onPress={() => {signOut(auth); props.navigation.navigate("Home")}}>
			<Text style={{color:"white"}}>
			Logout
			</Text>
			</Pressable>
		)
	}
}
