import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Screen from '../../components/Screen';
import AppImageBackground from '../../components/AppImageBackground';

const imageStyles = { maxWidth: "100%" }
const ArticleImage = ({ source }) => {
    if (!source) return <Image source={require("../../assets/default.png")} style={{...imageStyles}} />
    else return <Image source={{ width: 300, height: 300, uri: source }} style={{...imageStyles}} />
}


function ArticleDetailsScreen({ route }) {
    const article = {
        // _id: 6,
        // title: "Article3",
        // body: "body3 body3 body3 body3 body3",
        // thumb: defaultThumb,
        // slug: "article3",
        // author: "author3",
        // date,
        ...route.params
    }

    console.log("article-detail", article);
    return (
        <AppImageBackground>
            <Screen style={styles.articleDetail}>
                <View style={styles.article}>
                    <ArticleImage source={article.thumb} />
                    <Text style={[styles.text1, styles.text]}> {article.title}</Text>
                    <Text style={styles.text}>{article.body}</Text>
                    <Text style={styles.text}>{article.date.substring(0, 10)} at {article.date.substring(11, 16)}</Text>
                    {/* <Text>added by {article.author}</Text> */}
                    {/* <Text style={[styles.author, styles.text]}>{article.author}</Text> */}
                </View>
            </Screen>
        </AppImageBackground>
    )
}
const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 15
    },
    articleDetail: {
        marginTop: 50,
        marginBottom: 10,
        marginLeft: "auto",
        marginRight: "auto"
    },
    article: {
        marginTop: 10,
        marginBottom: 20,
        borderColor: "#00dba0",
        borderWidth: 1,
        borderStyle: "solid",
        position: "relative",
        padding: 10
        // padding: 45
    },
    text1: {
        textAlign: "center",
        margin: "3%"
        // margin:"20px auto",
        // fontSize:
        // text-align: center;
        // margin: 20px auto;
        // font-size: 2em
    },
    author: {
        padding: 10,
        backgroundColor: "#00dba0",
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: 0,
        color: "#f121f"
    }
})
export default ArticleDetailsScreen;