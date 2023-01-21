import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ArticleListScreen from '../screens/articles/ArticleListScreen';
import ArticleDetailsScreen from "../screens/articles/ArticleDetailsScreen";

const Stack = createNativeStackNavigator()

function ArticleNavigator(props) {
    const options =  {headerShown:false}
    return (
<Stack.Navigator screenOptions={{animation:"slide_from_bottom"}}>
    <Stack.Screen name='ArticlesList' component={ArticleListScreen} options={{...options}}/>
    <Stack.Screen name='ArticleDetails' component={ArticleDetailsScreen}
    options={{title:"Article Details"}}
    //  options={{...options}}

     />
</Stack.Navigator>
    );
}

export default ArticleNavigator;