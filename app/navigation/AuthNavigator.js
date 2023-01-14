import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/accounts/LoginScreen";
import RegisterScreen from "../screens/accounts/RegisterScreen";
import ArticleDetailsScreen from '../screens/articles/ArticleDetailsScreen';

const Stack = createNativeStackNavigator()

export const ArticleDetailsNavigator = () => {
    return (
        <Stack.Navigator>
                     <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

const AuthNavigator = () => {
    return ( 
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
        </Stack.Navigator>
     );
}
 
export default AuthNavigator;