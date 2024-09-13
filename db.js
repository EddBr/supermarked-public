import {getFirestore, onSnapshot, doc} from "firebase/firestore";
import { getAuth } from "firebase.js";
import { userdata } from "./UserData";
const auth = getAuth()
const eggList = []
const milkList = []
const capitalise = str => str.charAt(0).toUpperCase() + str.slice(1)
const db = getFirestore();	
const sort_brand_by_price = (obj) => Object.entries(obj).sort(([,a],[,b])=> a-b) //as obj use Object.fromEntries()
const format_most_popular = (obj, id) => {
	let out = sort_brand_by_price(obj)
	return out.map(([key,value]) => <li key={id + key}>{capitalise(key) + ": £" +String(value)}</li>)
}
export const top_items = () => {
	let id = "eggs_6" 
	const eggs = onSnapshot(doc(db, userdata.location, id ), (doc) => {
		console.log("Current data: ", doc.data());
		eggList = format_most_popular(doc.data(),id)

	});
	id = "milk_semi_skimmed_litres_2.272"
	const milk = onSnapshot(doc(db, userdata.location, id) , (doc) => {
		console.log("Current data: ", doc.data());
		milkList = format_most_popular(doc.data(),id)
	});
	return [eggs,milk]
}
