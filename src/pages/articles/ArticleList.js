import React, { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext";
import { getAllArticles } from "../../services/userService";
import Article from "./Article";
import { GET_ALL_ARTICLES } from "../../context/UserContext";


const ArticleList = () => {
  const {user:{articles},userDispatch} = useContext(UserContext);
  useEffect(()=>{
    getAllArticles().then(res=>{
      console.log(res.data)
        userDispatch({
          type:GET_ALL_ARTICLES,
          payload:res.data
        })
    }).catch(err=>{
      console.log(err)
    })
    },[])
  return (
    <>
      <h1>Articles List</h1>
      <div className="articles">
        {articles.map((article,idx) => (
          <Article
            key={idx}
            article={article}
          />
        ))}
      </div>
    </>
  );
};

export default ArticleList;
