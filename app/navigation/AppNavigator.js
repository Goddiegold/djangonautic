import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import CreateArticleScreen from "../screens/articles/CreateArticleScreen";
import AppIcon from '../components/AppIcon';
import { TouchableOpacity } from 'react-native';
import ArticleNavigator from './ArticleNavigator';
import AccountScreen from "../screens/accounts/AccountScreen";

const Tab = createBottomTabNavigator()

const TabButton = ({...props}) => {
    return (
        <TouchableOpacity>
            <AppIcon {...props}/>
        </TouchableOpacity>
    )
}
const AppNavigator = () => {
    return ( 
        <>

        <Tab.Navigator>
            <Tab.Screen name="Home" 
            component={ArticleNavigator}
            options={{headerShown:false, 
            title:"Article",
            tabBarIcon:({size,color})=><AppIcon size={size} color={color} name="home"/>}}/>
        <Tab.Screen name="CreateArticle" component={CreateArticleScreen}  options={{headerShown:false,title:"Create Article", 
              tabBarIcon:({color,size})=><AppIcon size={size} color={color} name={"plus-circle"}/>}}/>

        <Tab.Screen name='Profile' component={AccountScreen}
            options={{headerShown:false, tabBarIcon:({size,color})=><AppIcon size={size} color={color} name="account"/>, title:"Profile"}}/>
        </Tab.Navigator>

        
        </>
     );
}
 
export default AppNavigator;