import React,{useContext, useState} from 'react';

const UserContext = React.createContext()


export default UserContext;

export const useUserContext = ()=> useContext(UserContext);