import * as  SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "djangonauticUserToken"


export const storeToken =  async token => {
    try{
        await SecureStore.setItemAsync(key,token)
    }catch(ex){
        alert("Something went wrong!")
console.log(ex)
    }
}   


export const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(key)
    } catch (ex) {
        console.log(ex)
        alert("Something went wrong!")
    }
}


export const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key)
    } catch (ex) {
        console.log(ex)
        alert("Something went wrong!")
    } 
}


export const decodeUserToken = (token) => {
    try {
        if(!token) return null;
        if (token) return { ...jwtDecode(token), token }
    }
    catch (ex) {
        console.log(ex)
    }
}
    

export const getUser = async () => {
    const token = await getToken()
    return token ? decodeUserToken(token) : null
    }
    