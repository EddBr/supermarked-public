import {Text,View } from "react-native";
import {styles, Separator} from "./styles"
export default MyBox = (props) => {
	const {data, navigation, title} = props
	const capitalise = str => str.charAt(0).toUpperCase() + str.slice(1)
	const sort_brand_by_price = (obj) => Object.entries(obj).sort(([,a],[,b])=> a-b) //as obj use Object.fromEntries()
	const format_most_popular = (obj) => {
		let out = sort_brand_by_price(obj)
		return out.map(([key,value]) => <Text key={key}>{capitalise(key) + ": £" +String(value) + "\n"}</Text>)
	}
	return (
		<View className="mybox" style={styles.mybox}>
		<Text className="box-title" key={title}>
		{title}
		<Separator />
		{"\n"}
		</Text>
		<Text className="box-text">
		{format_most_popular(data)}
		<Separator />
		{"\n"}
		</Text>
		<Text className="box-update">
		Data not up to date? {"\n\n"}
		<Text style={styles.pressable} onPress={() => navigation.navigate("Update", {...props})}>Update it here</Text>
		</Text>
		</View>
	)
}

