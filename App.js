import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import { getUser, removeToken} from './app/utils';
import UserContext from './app/context/UserContext';

export default function App() {
  const [user, setUser] = useState({
    _id:"",
    name: "",
    email: "",
    token: ""
  })

  const restoreUser = async () => {
    if(user.name) return;
    const currentUser = await getUser()
  setUser(currentUser)
  }

  useEffect(()=>{
restoreUser()
  },[])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {!user.name ? <AuthNavigator /> : <AppNavigator />}
      </NavigationContainer>
    </UserContext.Provider>
  );
}

