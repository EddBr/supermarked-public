import { View, Text, Pressable, ScrollView } from "react-native";
import MyBox from "./mybox.js"
import {useState, useEffect} from "react";
import {getFirestore, onSnapshot, doc, collection, query, getDocs} from "firebase/firestore";
import LogInOut from "./LogInOut.js"
import  { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {getAuth} from "./firebase.js"
import { SearchBar } from "./Search.js";
import { styles } from "./styles.js";
import { userdata } from "./UserData.js";
export const HomePage = ({navigation}) => {
	const [dataLoaded, setDataLoaded] = useState(false)
	const [dataList, setDataList] = useState({})
	const [isAnon, setIsAnon] = useState(false)
	const [hasUser, setHasUser] = useState(false)
	const [initialising, setInitialising] = useState(true)
	const auth = getAuth()

	const getData = async() => {
		const db = getFirestore();	
		const q = query(collection(db, userdata.location))
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			console.log(doc.id, " => ", doc.data());
			const newObj = {}
			newObj[doc.id] = doc.data()
			setDataList(obj => ({...obj, ...newObj}))
		});
		setDataLoaded(true)
	}
	useEffect(() => {
		if (Object.is(auth.currentUser, null)){
			setHasUser(false)
			signInAnonymously(auth)
		}
		else{
			getData();
		}
	}, [hasUser])

	onAuthStateChanged(auth, (user) => {
		if (Object.is(auth.currentUser, null)){
			signInAnonymously(auth)
		}
		if (user){
			setHasUser(true)
			setInitialising(false)
			setIsAnon(user.isAnonymous)
		}
	})

	return (
		<ScrollView>
		{dataLoaded ?
			<View>
			<SearchBar/>
			{Object.entries(dataList).map(([key,value]) => <MyBox title={key} key={key} id={key} data={value} navigation={navigation}/>)}
			<LogInOut  navigation={navigation} initialising={initialising} isAnon={isAnon}/>
			<Text>Want a new item?</Text>
			{isAnon ? 
				<Text>You must sign to request it</Text>
				:
				<Pressable style={styles.pressable} onPress={() => navigation.navigate("Request")}>
				<Text style={{color:"white"}}>Request it here</Text>
				</Pressable>
			}
			</View>
			:
			<Text>Loading</Text>}
		</ScrollView>
	);
}

