import React, {  useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GET_ARTICLE, UserContext } from '../../context/UserContext';
import { getArticle } from '../../services/userService';

const ArticleDetail = () => {
  const {id} = useParams();
  const [article,setArticle] = useState({
    date:"",
    author:"",
    body:"",
    title:"",
    thumb:""
  })
  useEffect(()=>{
getArticle(id).then(res=>{
  console.log(res);
  setArticle(res.data)
}).catch(err=>{
  console.log(err);
  toast.error(err.response.data)
})
  },[id])
    return (
      <div className="article-detail">
        <div className="article">
          <img src={article.thumb}/>
          <h2>{article.title}</h2>
          <p>{article.body}</p>
          <p>{article.date.substring(0,10)} at {article.date.substring(11,16)}</p>
          <p className="author">added by {article.author}</p>
        </div>
      </div>
    );

  // return <h1>{match?.params?.id} {console.log(path.id)}</h1>
}

 
export default ArticleDetail;