import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ArticleDetailsScreen from "../screens/articles/ArticleDetailsScreen";
import ArticleListScreen from "../screens/articles/ArticleListScreen";
import CreateArticleScreen from "../screens/articles/CreateArticleScreen";

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return ( 
        <Stack.Navigator>
            <Stack.Screen name="ArticleList" component={ArticleListScreen} options={{headerShown:false}}/>
            <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} options={{headerShown:false}}/>
            <Stack.Screen name="CreateArticle" component={CreateArticleScreen}/>
        </Stack.Navigator>
     );
}
 
export default AppNavigator;