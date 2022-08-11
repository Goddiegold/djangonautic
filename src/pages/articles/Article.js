import React from 'react';
import { Link} from 'react-router-dom';



const Article = ({ article}) => {

  return (
    <>
      <div className="article">
        <h2>
          <Link to={`/articles/${article.slug}/${article._id}`}>
            {article.title}
          </Link>
        </h2>
        <p>{article.body.slice(0, 20)}...</p>
        <p>{article?.date.substring(0,10)} at {article?.date.substring(11,16)}</p>
        <p className="author">added by {article.author}</p>
      </div>
    </>
  );
};
 
export default Article; 