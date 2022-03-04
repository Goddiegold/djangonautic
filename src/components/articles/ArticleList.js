import React from "react"
import Article from "./Article";



const ArticleList = ({articles,handleDetail}) => {
  return (
    <>
      <h1>Articles List</h1>
      <div className="articles">
        {articles.map((article,idx) => (
          <Article
            key={idx}
            article={article}
            handleDetail={handleDetail}
          />
        ))}
      </div>
    </>
  );
};

export default ArticleList;
