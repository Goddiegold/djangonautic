import React, { useContext } from 'react';
import { StyleSheet, View,Text, TouchableOpacity } from 'react-native';
import Screen from '../../components/Screen';
import UserContext from '../../context/UserContext';
import AppIcon from '../../components/AppIcon';
import { removeToken } from '../../utils';


function AccountScreen({navigation}) {
    const {user,setUser} = useContext(UserContext)
    const handleLogout = () => {
        setUser({})
        removeToken()
            }
    const navigate = route =>  navigation.navigate(route)
    return (
        <Screen>
        <View style={styles.container}>
        <Text style={[styles.text]}>Welcome {user} 👋</Text>
        <TouchableOpacity onPress={()=>navigate("CreateArticle")}>
        <Text style={styles.text}>Create Article{" "}
              <AppIcon name='add-box' type2={true} size={17}/>
              </Text>
        </TouchableOpacity>
           
           <TouchableOpacity onPress={handleLogout}>
            <Text style={[styles.text]}>Logout <AppIcon name='logout' size={17}/></Text>
           </TouchableOpacity>
        </View>
        </Screen>
    )
}
const styles = StyleSheet.create({
    container: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        width:"95%",
        marginBottom:10
    },
    text:{
        fontSize:20,
        color:"white"
    },
    text2:{
        marginTop:5,
        marginBottom:5,
        width:200,
        padding:10,
        borderColor:"#00dba0",
        borderWidth: 1,
    borderStyle: "solid",
    }
})
export default AccountScreen;