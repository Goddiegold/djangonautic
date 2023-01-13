import react from 'react';
import {StyleSheet,View} from 'react-native';
import {MaterialCommunityIcons,MaterialIcons} from "@expo/vector-icons"

function AppIcon({name,size,color, type2}) {
if (!type2) return <MaterialCommunityIcons name={name} size={size} color={color}/>
return <MaterialIcons name={name} size={size} color={color}/>
}
export default AppIcon;