import react from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { date, defaultThumb } from './ArticleListScreen';
import Screen from '../../components/Screen';
import AppImageBackground from '../../components/AppImageBackground';

function ArticleDetailsScreen() {
    const article = {
        _id: 6,
        title: "Article3",
        body: "body3 body3 body3 body3 body3",
        thumb: defaultThumb,
        slug: "article3",
        author: "author3",
        date,
    }
    return (
        <AppImageBackground>
        <Screen style={styles.articleDetail}>
        <View style={styles.article}>
        <Image source={article.thumb} style={{maxWidth:"100%"}}/>
            <Text style={[styles.text1,styles.text]}> {article.title}</Text>
            <Text style={styles.text}>{article.body}</Text>
            <Text style={styles.text}>{article.date.substring(0,10)} at {article.date.substring(11,16)}</Text>
            <Text>added by {article.author}</Text>
        </View>
        </Screen>
        </AppImageBackground>
    )
}
const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize:15
    },
    articleDetail:{
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
        padding:10
        // padding: 45
    },
    text1:{
        textAlign:"center",
        margin:"3%"
        // margin:"20px auto",
        // fontSize:
        // text-align: center;
        // margin: 20px auto;
        // font-size: 2em
    }
})
export default ArticleDetailsScreen;