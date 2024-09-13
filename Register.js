import { Pressable, Text, TextInput, View } from "react-native"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { getAuth } from "./firebase.js"
import { useState } from "react";
import { styles } from "./styles";
export const RegistrationPage = (props) => {
	const auth = getAuth();
	const [email, setEmail] = useState("")
	const [pswd, setPswd] = useState("")
	const [confirmPswd, setConfirmPswd] = useState("")
	const [formErrors, setFormErrors] = useState("")
	const [correctSubmission, setCorrectSubmission] = useState(false)
	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};
	const validateForm = () => {
		if (!validateEmail(email)){
			setFormErrors("Enter a valid email")
			return false;
		}
		if (!pswd){
			setFormErrors("Password cannot be blank")
			return false
		}
		if (pswd.length < 8){
			setFormErrors("Password must be at least 8 characters long")
			return false
		}
		if (pswd != confirmPswd){
			setFormErrors("Passwords do not match")
			return false;
		}
		return true;
	}
	const submitForm = () =>{
		setCorrectSubmission(false)
		if (validateForm()){
			setFormErrors("")
			setCorrectSubmission(true)
			createUserWithEmailAndPassword(auth,email,pswd)
				.then((userCredential) => {
					const user = userCredential.user;
				})
		}
		//Clears passwords
		setPswd("")
		setConfirmPswd("")
	}
	return (
		<View style={styles.mybox}>
		<View className="registrationForm" style={styles.form}>
		{correctSubmission ? 
			<View>
		<Text style={{color:"green"}}>Account successfully created for {email}</Text> 
			<Text>Click <Text onPress={() => props.navigation.navigate("Login")} style={styles.pressable}>here</Text> to login</Text>
			</View>
			: 
		<View>
		<TextInput value={email} onChangeText={setEmail} placeholder={"Enter your email"} autoComplete="email" inputMode="email" />
		<TextInput value={pswd} onChangeText={setPswd} placeholder={"Enter your password"} autoComplete="new-password" secureTextEntry />
		<TextInput value={confirmPswd} onChangeText={setConfirmPswd} placeholder={"Confirm your password"} autoComplete="new-password" secureTextEntry />
		<Pressable onPress={submitForm}>
		<Text>Submit</Text>
		</Pressable>
			</View>
		}
		<Text style={{color: "red"}}>
		{formErrors}
		</Text> 
		</View>
		</View>
	)
}
