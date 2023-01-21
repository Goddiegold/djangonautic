import react, { useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { logRegStyles, customFormStyles } from '../accounts/LoginScreen';
import FormField from '../../components/FormField';
import AppButton from '../../components/AppButton';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker";
import ImageInput from '../../components/ImageInput';
import AppImageBackground from '../../components/AppImageBackground';
import { createArticle } from '../../services/userService';
import mime from "mime";
import ErrorMessage from '../../components/ErrorMessage';
import { useUserContext } from '../../context/UserContext';

const customStyles = {
    height: 100
}

function CreateArticleScreen({ navigation }) {
    const [article, setArticle] = useState({
        title: "",
        body: "",
        thumb: require("../../assets/default.png")
    })

    const { articles, setArticles } = useUserContext()

    const [error, setError] = useState("")

    const [selectedImage, setSelectedImage] = useState('')

    const handleImageChange = (data) => {
        setError('')
        setSelectedImage(data)
    }

    const [loading, setLoading] = useState(false)

    const handleFormSubmit = () => {
        setError('')
        if (!article.title || !article.body) return alert("Fill all values!")
        console.log(article);
        setLoading(true)
        console.log(selectedImage);
        const newImageUri = "file:///" + selectedImage.split("file:/").join("");
        const formData = new FormData()
        formData.append("title", article.title)
        formData.append("body", article.body)

        if(selectedImage){
        formData.append("thumb",{
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        })}
        createArticle(formData).then(res => {
            setArticles([res.data, ...articles])
            setLoading(false)
            setArticle({
                title: "",
                body: ""
            })
            setSelectedImage('')
            navigation.navigate("Home")
        }).catch(err => {
            setLoading(false)
            setError(err)
            console.log(err);
        })
    }



    return (
        <AppImageBackground>
            <View style={styles.container}>
                {error && <ErrorMessage err={error} />}
                <Text style={styles.header}>Create New Article </Text>
                <FormField placeholder={"Title"} value={article.title} handleChange={(text) => {
                    setError('')
                    setArticle({ ...article, title: text })
                }} />
                <FormField
                    placeholder={"Body"}
                    value={article.body}
                    handleChange={(text) => {
                        setError('')
                        setArticle({ ...article, body: text })
                    }}
                    customStyles={customStyles}
                />
                <ImageInput
                    imageUri={selectedImage}
                    onChangeImage={handleImageChange}
                />
                <AppButton title={loading ? "Please wait..." : "Proceed"}
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