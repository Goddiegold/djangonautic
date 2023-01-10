import react, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import FormField from '../../components/FormField';
import Constants from 'expo-constants';
import AppButton from '../../components/AppButton';
import AppImageBackground from '../../components/AppImageBackground';

export const customFormStyles = {
    borderRadius: 10,
    width: "90%"
}


export const logRegStyles = {
    container: {
        marginTop: Constants.statusBarHeight * 2,
        width: "100%",
        height: "100%",
        position: 'absolute',
        top: 100,
        alignItems: "center",
        zIndex: 1
    },
    header: {
        fontSize: 30,
        color: "white",
        marginBottom: 20
    }
}

function LoginScreen() {


    const [user, setUser] = useState({
        email: "",
        password: ""
    })


    const handleFormSubmit = () => {
        if (!user.email || !user.password) return Alert.alert("Fill all values!")
        // console.log(typeof(user.email))
        console.log(user);
    }

    return (
        <AppImageBackground>
        <View style={styles.container}>
            <Text style={styles.header}>Hi 👋, welcome back here.</Text>
            <FormField placeholder={"Email"} value={user.email} handleChange={(text) => setUser({ ...user, email: text })} />
            <FormField placeholder={"Password"} value={user.password} handleChange={(text) => setUser({ ...user, password: text })} />
            <AppButton title={"Login"}
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
export default LoginScreen;