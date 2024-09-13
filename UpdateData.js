import { Text, View, Pressable } from "react-native"
import { UpdateLine } from "./UpdateLine"
import { styles } from "./styles"
import { useState } from "react"
import { doc, getFirestore, runTransaction, updateDoc } from "firebase/firestore"
import { userdata } from "./UserData"
export const UpdatePage = (props) => {
	const db = getFirestore()
	const [changes, setChanges] = useState({})
	const [newSupermarkets, setNewSupermarkets] = useState({})
	const sort_brand_by_price = (obj) => Object.entries(obj).sort(([,a],[,b])=> a-b) //as obj use Object.fromEntries()
	const format_most_popular = (obj) => {
		let out = sort_brand_by_price(obj)
		return out.map(([key,value]) => UpdateLine(key,value, setChanges))
	}
	const handleSubmission = async() => {
		const idRef = doc(db, userdata.location, props.route.params.id)
		try {
			await runTransaction(db, async(transaction) => {
				const testDoc = await transaction.get(idRef)
				if(!testDoc.exists()){
					console.log("Doc not found")
					return;
				}
				transaction.update(idRef,{...changes})
			})

			if (Object.entries(newSupermarkets).length > 0) {
				await updateDoc(doc(db, userdata.location), newSupermarkets)
			}

			console.log("Transaction successfully committed!");
			props.navigation.navigate("Home")
		} catch (e) {
			console.log("Transaction failed: ", e);
		}
	}

	const addSupermarket = async () => {
	}

	return (
		<View style={styles.mybox}>
		<Text style={{fontSize:20}}>
		{props.route.params.title}
		</Text>
		{format_most_popular(props.route.params.data)}
		{ Object.keys(changes).length > 0 && 
				<Pressable onPress={handleSubmission} style={styles.pressable}><Text>Submit</Text></Pressable>
		}
		</View>
	)
}

