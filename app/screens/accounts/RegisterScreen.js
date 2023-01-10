import react, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import FormField from '../../components/FormField';
import Constants from 'expo-constants';
import AppButton from '../../components/AppButton';
import { logRegStyles,customFormStyles } from './LoginScreen';
import AppImageBackground from '../../components/AppImageBackground';


function RegisterScreen() {


    const [user, setUser] = useState({
        name:"",
        email: "",
        password: ""
    })


    const handleFormSubmit = () => {
        if (!user.email || !user.password || !user.name) return Alert.alert("Fill all values!")
        // console.log(typeof(user.email))
        console.log(user);
    }

    return (
        <AppImageBackground>
        <View style={styles.container}>
            <Text style={styles.header}>Hi 👋, welcome back here.</Text>
            <FormField placeholder={"Name"} value={user.name} handleChange={(text) => setUser({ ...user, name: text })} />
            <FormField placeholder={"Email"} value={user.email} handleChange={(text) => setUser({ ...user, email: text })} />
            <FormField placeholder={"Password"} value={user.password} handleChange={(text) => setUser({ ...user, password: text })} />
            <AppButton title={"Register"}
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