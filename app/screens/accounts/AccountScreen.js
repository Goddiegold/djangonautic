import React, { useContext } from 'react';
import { StyleSheet, View,Text, TouchableOpacity } from 'react-native';
import Screen from '../../components/Screen';
import UserContext from '../../context/UserContext';
import AppIcon from '../../components/AppIcon';
import { removeToken } from '../../utils';
import AppImageBackground from '../../components/AppImageBackground';


function AccountScreen({navigation}) {
    const {user,setUser} = useContext(UserContext)
    const handleLogout = () => {
        setUser({})
        removeToken()
            }
    const navigate = route =>  navigation.navigate(route)
    return (
        <AppImageBackground>
        <Screen style={styles.wrapper}>
        <Text style={[styles.text]}>Name: {user.name}</Text>
        <Text style={[styles.text]}>Email: {user.email}</Text>
           <TouchableOpacity onPress={handleLogout}>
            <Text style={[styles.text,styles.text2]}>Logout <AppIcon name='logout' size={20}/></Text>
           </TouchableOpacity>
        </Screen>
        </AppImageBackground>
    )
}
const styles = StyleSheet.create({
    wrapper:{
            // maxWidth:"960px",
            marginTop: 50,
            marginBottom: 10,
            // max-width: 960px;
            // margin: 0 auto;
            marginLeft:"-20%"
    },
    text:{
        fontSize:20,
        color:"white",
        width:200,
        padding:10,
    },
    text2:{
        marginTop:5,
        marginBottom:5,
        width:200,
        padding:10,
        borderColor:"#00dba0",
        borderWidth: 1,
    borderStyle: "solid",
    textAlign:"center"
    }
})
export default AccountScreen;