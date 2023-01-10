import React from 'react';
import { View,Text,TouchableOpacity,StyleSheet,TouchableHighlight} from 'react-native';

const AppButton = ({title,onPress,customStyles}) => {
    return (  
        <TouchableOpacity
        style={[styles.button,customStyles]} onPress={onPress}>
<Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        // backgroundColor:"#fc5c65",
        borderColor:"#00dba0",
        borderWidth:2,
        borderRadius:25,
        justifyContent:"center",
        alignItems:"center",
        padding:15,
        width:"100%",
        marginVertical:10,
    },
    text:{
        color:"#fff",
        fontSize:18,
        textTransform:"uppercase",
        fontWeight:"bold"
    }
})
 
export default AppButton;