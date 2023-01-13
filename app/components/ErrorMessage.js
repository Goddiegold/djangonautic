import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function ErrorMessage({ err }) {
    const error = err?.response?.data ? err.response.data : "Something went wrong!"
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{error}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        width: "100%",alignItems:"center"
    },
    text: {
        color: "red",
        fontSize:25
    }
})
export default ErrorMessage;