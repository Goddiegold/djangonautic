import react, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { logRegStyles, customFormStyles } from '../accounts/LoginScreen';
import FormField from '../../components/FormField';
import AppButton from '../../components/AppButton';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker";
import ImageInput from '../../components/ImageInput';
import AppImageBackground from '../../components/AppImageBackground';

const customStyles =  {
     height:100   
}

function CreateArticleScreen() {
    const [article, setArticle] = useState({
        title: "",
    body: "",
    thumb:require("../../assets/default.png")
    })

    const [imageUri,setImageUri] = useState("")

    const handleImageChange = (data) => {
        setImageUri(data)
    }

    const handleFormSubmit = () => {
        if (!article.title || !article.body) return alert("Fill all values!")
        console.log(article);
    }


   
    return (
        <AppImageBackground>
        <View style={styles.container}>
            <Text style={styles.header}>New Article Details</Text>
            <FormField placeholder={"Title"} value={article.title} handleChange={(text) => setArticle({ ...article, title: text })} />
            <FormField
             placeholder={"Body"}
              value={article.body} 
              handleChange={(text) => setArticle({ ...article, body: text })}
              customStyles={customStyles}
               />
               <ImageInput
               imageUri={imageUri} 
                onChangeImage={handleImageChange}
               />
            <AppButton title={"Proceed"}
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
export default CreateArticleScreen;