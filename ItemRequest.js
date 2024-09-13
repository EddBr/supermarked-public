import { View, Pressable, TextInput, Text } from "react-native"
import { styles } from "./styles"
import { useState } from "react"
import { setDoc, doc, getFirestore } from "firebase/firestore"
import { getAuth } from "./firebase"
import { supermarket_list } from "./Hardcoded"
import { userdata } from "./UserData"
export const RequestPage = ({navigation}) => {
	const [productName, setProductName] = useState("")
	const [quantity, setQuantity] = useState("")
	const [unit, setUnit] = useState("")
	const auth = getAuth()
	const db = getFirestore();	

	const onSumbission = async () => {
		let name = unit.length > 0 ? productName + "_" + quantity + "_" + unit : productName + "_" + quantity;
		await setDoc(doc(db, userdata.location, name), {})
			.then(() => {
			navigation.navigate("Home")	
			})

	}

	return (
		<View style={styles.form}>
		<TextInput value={productName} onChangeText={setProductName} placeholder="Enter product name, i.e. Milk"></TextInput>
		<TextInput value={quantity} onChangeText={setQuantity} placeholder="Quantity of product, i.e. 2"></TextInput>
		<TextInput value={unit} onChangeText={setUnit} placeholder="Unit of Measurement, i.e. Litres"></TextInput>
		<Pressable style={styles.pressable} onPress={onSumbission}><Text style={{color:"white"}}>Submit</Text></Pressable>
		</View>
	)
}
