import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import AppImageBackground from '../../components/AppImageBackground';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import { useUserContext } from '../../context/UserContext';
import { getAllArticles } from '../../services/userService';

export const defaultThumb = require("../../assets/default.png");
export const date = `2022-07-25T11:32:02.270+00:00`

// const articles = [
//   {
//     _id: 1,
//     title: "Article1",
//     body: "body1 body1 body1 body1 body1",
//     thumb: defaultThumb,
//     author: "author1",
//     // author: "author1",
//     slug: "article1",
//     date,
//   },
//   {
//     _id: 2,
//     title: "Article2",
//     body: "body2 body2 body2 body2 body2",
//     thumb: defaultThumb,
//     slug: "article2",
//     author: "author2",
//     date,
//   },
//   {
//     _id: 3,
//     title: "Article3",
//     body: "body3 body3 body3 body3 body3",
//     thumb: defaultThumb,
//     slug: "article3",
//     author: "author3",
//     date,
//   },
//   {
//     _id: 4,
//     title: "Article1",
//     body: "body1 body1 body1 body1 body1",
//     thumb: defaultThumb,
//     author: "author1",
//     // author: "author1",
//     slug: "article1",
//     date,
//   },
//   {
//     _id: 5,
//     title: "Article2",
//     body: "body2 body2 body2 body2 body2",
//     thumb: defaultThumb,
//     slug: "article2",
//     author: "author2",
//     date,
//   },
//   {
//     _id: 6,
//     title: "Article3",
//     body: "body3 body3 body3 body3 body3",
//     thumb: defaultThumb,
//     slug: "article3",
//     author: "author3",
//     date,
//   },
// ];

function ArticleListScreen({ navigation }) {

  const { articles, setArticles } = useUserContext()

  const getArticles = () => {
    getAllArticles().then(res => {
      setArticles(res.data)
      console.log("article length-->",res.data.length)
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    getArticles()
  }, [])
  return (
    <AppImageBackground>
      <Screen style={styles.wrapper}>
        {/* <Header navigation={navigation}/> */}
        {/* <Text style={styles.text}>Article List</Text> */}
        <View style={styles.articles}>
          <Text style={styles.header}>Articles List</Text>
          <FlatList
            data={articles}
            keyExtractor={article => article?._id?.toString()}
            renderItem={({ item: article }) =>
              <TouchableOpacity onPress={() => navigation.navigate("ArticleDetails", article)}>
                <View style={styles.article}>
                  <Text style={styles.text}>{article.title}</Text>
                  <Text style={styles.text}>{article.body.slice(0, 20)}...</Text>
                  <Text style={styles.text}>{article.date.substring(0, 10)} at {article.date.substring(11, 16)}</Text>
                  <Text style={[styles.author, styles.text]}>{article.author}</Text>
                </View>
              </TouchableOpacity>
            }
          />

        </View>
      </Screen>
    </AppImageBackground>

  )
}
const styles = StyleSheet.create({

  wrapper: {
    marginTop: 50,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    height:"auto"
  },
  articles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    minWidth: "80%"
  },
  article: {
    marginTop: 10,
    marginBottom: 20,
    borderColor: "#00dba0",
    borderWidth: 1,
    borderStyle: "solid",
    position: "relative",
    padding: 45,
  },
  author: {
    padding: 10,
    backgroundColor: "#00dba0",
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 0,
    color: "#f121f"
  },
  text: {
    color: "white",
    fontSize: 18
  },
  header: {
    color:"white",
    textAlign:"center",
    fontSize:20
  }
})
export default ArticleListScreen;