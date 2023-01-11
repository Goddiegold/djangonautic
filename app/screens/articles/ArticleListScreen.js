import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import AppImageBackground from '../../components/AppImageBackground';
import Screen from '../../components/Screen';
import { useUserContext } from '../../context/UserContext';
import { getUser } from '../../utils';

export const defaultThumb = require("../../assets/default.png");
export const date = `2022-07-25T11:32:02.270+00:00`

const articles = [
  {
    _id: 1,
    title: "Article1",
    body: "body1 body1 body1 body1 body1",
    thumb: defaultThumb,
    author: "author1",
    // author: "author1",
    slug: "article1",
    date,
  },
  {
    _id: 2,
    title: "Article2",
    body: "body2 body2 body2 body2 body2",
    thumb: defaultThumb,
    slug: "article2",
    author: "author2",
    date,
  },
  {
    _id: 3,
    title: "Article3",
    body: "body3 body3 body3 body3 body3",
    thumb: defaultThumb,
    slug: "article3",
    author: "author3",
    date,
  },
  {
    _id: 4,
    title: "Article1",
    body: "body1 body1 body1 body1 body1",
    thumb: defaultThumb,
    author: "author1",
    // author: "author1",
    slug: "article1",
    date,
  },
  {
    _id: 5,
    title: "Article2",
    body: "body2 body2 body2 body2 body2",
    thumb: defaultThumb,
    slug: "article2",
    author: "author2",
    date,
  },
  {
    _id: 6,
    title: "Article3",
    body: "body3 body3 body3 body3 body3",
    thumb: defaultThumb,
    slug: "article3",
    author: "author3",
    date,
  },
];

function ArticleListScreen() {
  const {user} = useUserContext()
  return (
    <AppImageBackground>
    <Screen style={styles.wrapper}>
      <Text style={styles.text}>{user.name}</Text>
      <View style={styles.articles}>

        <FlatList
          data={articles}
          keyExtractor={article => article._id.toString()}
          renderItem={({ item: article }) =>
            <View style={styles.article}>
             <Text style={styles.text}>{article.title}</Text>
              <Text style={styles.text}>{article.body.slice(0, 20)}...</Text>
              <Text style={styles.text}>{article.date.substring(0, 10)} at {article.date.substring(11, 16)}</Text>
              <Text style={[styles.author, styles.text]}>{article.author}</Text>
            </View>
          }
        />

      </View>
    </Screen>
            </AppImageBackground>

  )
}
const styles = StyleSheet.create({

  wrapper: {
    // maxWidth:"960px",
    marginTop: 50,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto"
    // max-width: 960px;
    // margin: 0 auto;
  },
  articles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"

    // display: grid;
    // grid-template-columns: 1fr 1fr 1fr;
    // grid-gap: 30px;
  },
  article: {
    marginTop: 10,
    marginBottom: 20,
    borderColor: "#00dba0",
    borderWidth: 1,
    borderStyle: "solid",
    position: "relative",
    padding: 45,
    // padding: 10px;
    // border: 1px solid #00dba0;
    // position: relative;
    // padding-bottom: 40px;
  },
  author: {
    padding: 10,
    backgroundColor: "#00dba0",
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 0,
    color: "#f121f"
    //     padding: 10,
    // background: #00dba0;
    // position: absolute;
    // right: 0;
    // bottom: 0;
    // margin: 0;
    // color: #0f121f;
  },
  text: {
    color: "white",
    fontSize: 18
  }
})
export default ArticleListScreen;