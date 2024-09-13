import { StyleSheet, View} from "react-native";
export const MONEY_COLOURS = ["#3e9c35", "#168118", "#157811", "#036704", "#084f09"]
export const styles = StyleSheet.create({
	mybox: {
		backgroundColor: '#fff',
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: '#000',
		padding: 10,
		margin: 20,
	},
	separator: {
		display:"flex",
		alignSelf: "stretch",
		height: 1,
		backgroundColor: "black",
	},
	text: {
		verticalAlign: "center",
		textAlign:"center",
	},
	formErrors: {
		color: "red",
	},
	form: {
		display: "flex",
		alignItems: 'center',
		justifyContent: 'center',
	},
	username: {
		borderRadius: 25,
	},
	pswd: {
		borderRadius: 25,
	},
	pressable: {
		paddingVertical: 6,
		paddingHorizontal: 16,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: MONEY_COLOURS[0],
		color: "white",
	}
})
export const Separator = () => <View style={styles.separator} />

