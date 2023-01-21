import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import FormField from '../../components/FormField';
import AppButton from '../../components/AppButton';
import { logRegStyles,customFormStyles } from './LoginScreen';
import AppImageBackground from '../../components/AppImageBackground';
import { register } from '../../services/userService';
import { storeToken,decodeUserToken } from '../../utils';
import { useUserContext } from '../../context/UserContext';
import ErrorMessage from '../../components/ErrorMessage';


function RegisterScreen() {

    const [user, setUser] = useState({
        name:"",
        email: "",
        password: ""
    })

    const [error,setError] = useState('')

    const {setUser:_setUser} = useUserContext();

const [loading,setLoading] = useState(false)

    const handleFormSubmit = () => {
        if (!user.email || !user.password || !user.name) return Alert.alert("Fill all values!")
        // console.log(typeof(user.email))
        console.log(user);
        setLoading(true)
        register(user).then(async res=>{
            console.log(res.data)
            const token = res.headers["auth-token"]
            const user = decodeUserToken(token)
            _setUser(user)
           storeToken(token)
            setLoading(false)
        }).catch(err=>{
            setLoading(false)
            setError(err)
        })
    }

    return (
        <AppImageBackground>
        <View style={styles.container}>
        {error && <ErrorMessage err={error}/>}
            <Text style={styles.header}>Hi 👋, welcome back here.</Text>
            <FormField placeholder={"Name"} value={user.name} handleChange={(text) => setUser({ ...user, name: text })} />
            <FormField placeholder={"Email"} value={user.email} handleChange={(text) => setUser({ ...user, email: text })} />
            <FormField placeholder={"Password"} value={user.password} handleChange={(text) => setUser({ ...user, password: text })} />
            <AppButton title={loading?"Please wait...":"Register"}
                onPress={handleFormSubmit}
                customStyles={customFormStyles}
            />
        </View>
        </AppImageBackground>
    )
}
const styles = StyleSheet.create({
    ...logRegStyles
})
export default RegisterScreen;