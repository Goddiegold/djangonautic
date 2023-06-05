import react from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import AppButton from "../components/AppButton";
import AppImageBackground from '../components/AppImageBackground';

function WelcomeScreen({navigation}) {

    const navigate = route => navigation.navigate(route)
    return (
        <AppImageBackground>
            <View style={styles.logoContainer}>
                <Text style={{
                    ...styles.tagline,
                    fontSize: 50,
                    paddingTop: 15,
                     color: "#00dba0",
                     fontWeight:"600"
                }}>Djangonautic</Text>
                <Text style={styles.tagline}>Writing made easy...</Text>
            </View>

            <View style={styles.buttonContainer}>
                <AppButton title={"Login"} onPress={() => navigate("Login")} />

                <AppButton title={"Register"} color={"#4ecdc4"} onPress={() => navigate("Register")} />
            </View>
        </AppImageBackground>

    )
}
const styles = StyleSheet.create({
    logoContainer: {
        position: 'absolute',
        top: 100,
        alignItems: "center"
    },
    logo: {
        width: "100%"
    },
    buttonContainer: {
        padding: 20,
        width: "100%"
    },
    tagline: {
        color: "white",
        fontSize: 15,
        paddingVertical: 0
    }
})
export default WelcomeScreen;