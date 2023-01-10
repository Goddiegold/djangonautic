import react from 'react';
import { StyleSheet, TextInput} from 'react-native';

function FormField({handleChange,value,placeholder,customStyles}) {
    return (
            <TextInput
            placeholderTextColor={'black'}
            placeholder={placeholder}
style={[styles.input,customStyles]}
onChangeText={handleChange}
value={value}
            />
    )
}

const styles = StyleSheet.create({
    input: {
        paddingLeft:10,
        marginBottom:15,
        borderColor:"white",
        // borderWidth:2,
        width:"90%",
        height:60,
        borderRadius:10,
        color:"black",
        backgroundColor:"white"
    }
})

export default FormField;