import React,{useReducer,createContext, useEffect} from 'react';
import { getCurrentUser } from '../services/userService';

export const UserContext = createContext();


const djangonauticUserToken="djangonauticUserToken";

//user's action
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const GET_USER = "GET_USER";

function userReducer(state,action){
switch(action.type){
    case USER_LOGIN:
        localStorage.setItem(djangonauticUserToken,action.payload)
        return getCurrentUser(action.payload)
    case USER_LOGOUT:
        localStorage.removeItem(djangonauticUserToken)
        return {};
    default:
        return state;  
}
}

function UserContextProvider({children}) {
    const [user,userDispatch] = useReducer(userReducer,{},()=>{
const token = localStorage.getItem(djangonauticUserToken);
if(token) return getCurrentUser(token)
else return {}
    })  

// useEffect(()=>{
// localStorage.setItem("djangonauticUserToken",user)
// },[])

// useEffect(()=>{
//     const token = localStorage.getItem(djangonauticUserToken);
//     if(token){
//         userDispatch({
//             type:USER_LOGIN,
//             payload:getCurrentUser(token)
//         })
//     }
// },[])

 
    return (
        <UserContext.Provider value={{user,userDispatch}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;