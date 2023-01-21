import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AuthNavigator, { ArticleDetailsNavigator } from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from "./app/navigation/navigationTheme";
import { getUser, removeToken} from './app/utils';
import UserContext from './app/context/UserContext';

export default function App() {
  const [user, setUser] = useState({
    _id:"",
    name: "",
    email: "",
    token: ""
  })

  const [articles,setArticles] = useState([])


  const restoreUser = async () => {
    if(user.name) return;
    const currentUser = await getUser()
    if(!currentUser) return;
  setUser(currentUser)
  }

  useEffect(()=>{
restoreUser()
  },[])

  return (
    <UserContext.Provider value={{ user, setUser, articles,setArticles}}>
      <NavigationContainer theme={navigationTheme}>
        {!user?.name ? <AuthNavigator /> : <AppNavigator />}
      </NavigationContainer>
    </UserContext.Provider>
  );
}

