import { useState } from "react";
import {View, TextInput, Text, Pressable} from "react-native"
import { styles } from "./styles";
export const UpdateLine = (key,value, setChanges) => {
	const originalValue = value;
	const [editable, setEditable] = useState(false)
	const [cValue, setCValue] = useState(value)

	const capitalise = str => str.charAt(0).toUpperCase() + str.slice(1)
	const handleChange = (t) => {
		setCValue(t)
		if(originalValue != t){
			const newObj = {}
			newObj[key] = parseFloat(t)
			setChanges(obj => ({...obj, ...newObj}))
		}
		else{
			setChanges(obj => {
				const state = {...obj}
				delete state[key]
				return state
			})
		}
	}

	const handleEdit = () => {
		setEditable(true)
	}
	return (
		<View key={key} >
		<Text >{capitalise(key) + ": £"}
		</Text>
		{editable ? 
				<TextInput autoFocus={true} style={{minWidth:40}} value={String(cValue)} onChangeText={newText => handleChange(newText)} inputMode="decimal" ></TextInput>
				:
				<Text>{String(value)}</Text>
		}
		<Pressable onPress={handleEdit} style={styles.pressable}>
		<Text style={{color:"white"}}>
		Edit✍
		</Text>
		</Pressable>
		</View>
	);
}
