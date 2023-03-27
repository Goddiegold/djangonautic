import React, { useReducer, createContext, useEffect } from 'react';
import { getCurrentUser } from '../services/userService';

type StateReducerType = {
    userInfo: {},
    articles: {}[]
}

type ActionReducerType = {
    type: string,
    payload: any
}


type UserStateType =  {
    userDispatch: (params:ActionReducerType)=>void,
    user: StateReducerType          
}



export const UserContext = createContext<UserStateType | any>({});



export const djangonauticUserToken = "djangonauticUserToken";

//user's action
export enum USER_ACTION {
    USER_LOGIN = "USER_LOGIN",
    USER_LOGOUT = "USER_LOGOUT",
    GET_ALL_ARTICLES = "GET_ALL_ARTICLES",
    ADD_ARTICLE = "ADD_ARTICLE"
}
// export const USER_LOGIN = "USER_LOGIN";
// export const USER_LOGOUT = "USER_LOGOUT";
// export const GET_ALL_ARTICLES = "GET_ALL_ARTICLES";
// export const ADD_ARTICLE = "ADD_ARTICLE"



const userReducer = (state: StateReducerType, action: ActionReducerType):StateReducerType => {
    switch (action.type) {
        case USER_ACTION.USER_LOGIN:
            localStorage.setItem(djangonauticUserToken, action.payload)
            return { ...state, userInfo: getCurrentUser(action.payload) }
        case USER_ACTION.USER_LOGOUT:
            localStorage.removeItem(djangonauticUserToken)
            return { ...state, userInfo: {} };
        case USER_ACTION.GET_ALL_ARTICLES:
            return { ...state, articles: action.payload }
        default:
            return state;
    }
}

interface UserContextProviderProps {
    children: any,
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const [user, userDispatch] = useReducer(userReducer, {}, () => {
        const token = localStorage.getItem(djangonauticUserToken);
        if (token) return { userInfo: getCurrentUser(token), articles: [] }
        else return { userInfo: {}, articles: [] }
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
        <UserContext.Provider value={{ user, userDispatch }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;