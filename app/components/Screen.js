import react from 'react';
import Constants from 'expo-constants';
import { SafeAreaView,StyleSheet, View } from 'react-native';

function Screen({children,style}) {
    return (
        <SafeAreaView style={[styles.screen,style]}>
  <View style={[styles.container]}>
{children}
</View>
        </SafeAreaView>
      
    )
}
const styles = StyleSheet.create({
    screen:{
        paddingTop:Constants.statusBarHeight,
        flex:1
    },
    view:{
        flex:1
    }
})
export default Screen;