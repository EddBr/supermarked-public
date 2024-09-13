import React from 'react';
import { LoginPage } from './Login.js';
import { HomePage } from "./Home.js"
import {RegistrationPage} from "./Register.js"
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { UpdatePage } from './UpdateData.js';
import { RequestPage } from './ItemRequest.js';

export default function App() {
	const Stack = createNativeStackNavigator();
	return (
		<NavigationContainer>
		<Stack.Navigator>
		<Stack.Screen name="Home"
		component={HomePage}
		/>
		<Stack.Screen name="Request"
		component={RequestPage}
		/>
		<Stack.Screen name="Update"
		component={UpdatePage}
		/>
		<Stack.Screen name="Login"
		component={LoginPage}
		/>
		<Stack.Screen name="Register"
		component={RegistrationPage}
		/>
		</Stack.Navigator>
		</NavigationContainer>
	);

}

