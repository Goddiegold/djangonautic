import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetail = ({articles}) => {
  let id = useParams().id;
  // const [article, setArticle] = useState([]);
  //  let url = "http://localhost:1000/api/articles";
    // useEffect(() => {
    //   fetch(`${url}/${id}`)
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((data) => {
    //       setArticle(data);
    //     })
    //     .catch((err) => console.log(err.message));
    // }, []);
  
  const article = articles.find(article => article._id == id);
    return (
      <div className="article-detail">
        <div className="article">
          <img src={article.thumb}/>
          <h2>{article?.title}</h2>
          <p>{article?.body}</p>
          <p>{article?.date}</p>
          <p className="author">added by {article?.author}</p>
        </div>
      </div>
    );

  // return <h1>{match?.params?.id} {console.log(path.id)}</h1>
}

 
export default ArticleDetail;