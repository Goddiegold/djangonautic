import react from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

function AppImageBackground({children}) {
    return (
        <ImageBackground
         style={styles.background}
         blurRadius={10}
         source={require('../assets/background.png')}
         >
{children}
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
      }
})
export default AppImageBackground;