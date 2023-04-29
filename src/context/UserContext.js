import React,{useReducer,createContext, useEffect, useContext} from 'react';
import { getCurrentUser } from '../services/userService';

export const UserContext = createContext();


export const djangonauticUserToken="djangonauticUserToken";

//user's action
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const GET_ALL_ARTICLES = "GET_ALL_ARTICLES";
export const ADD_ARTICLE = "ADD_ARTICLE"

function userReducer(state,action){
switch(action.type){
    case USER_LOGIN:
        localStorage.setItem(djangonauticUserToken,action.payload)
        return{...state,userInfo:getCurrentUser(action.payload)}
    case USER_LOGOUT:
        localStorage.removeItem(djangonauticUserToken)
        return {...state,userInfo:{}};
    case GET_ALL_ARTICLES:
        return {...state,articles:action.payload}
    default:
        return state;  
}
}



function UserContextProvider({children}) {
    const [user,userDispatch] = useReducer(userReducer,{},()=>{
const token =  typeof window === "undefined" ? null :localStorage.getItem(djangonauticUserToken);
if(token) return {userInfo:getCurrentUser(token),articles:[]}
else return {userInfo:{},articles:[]}
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

