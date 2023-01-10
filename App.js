import { NavigationContainer } from '@react-navigation/native';
import { createContext, useState } from 'react';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';

export default function App() {
  const [user, setUser] = useState({
    _id:"",
    name: "",
    email: "",
    token: ""
  })

  const UserContext = createContext()

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {!user.name ? <AuthNavigator /> : <AppNavigator />}
      </NavigationContainer>
    </UserContext.Provider>
  );
}

