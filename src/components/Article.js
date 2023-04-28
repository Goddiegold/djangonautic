import React from 'react';
import Link from 'next/link';
import styles from '@/styles/App.module.css'


const Article = ({ article}) => {

  return (
    <>
      <div className={styles.article}>
        <h2>
          <Link href={`/articles/${article._id}`}>
            {article.title}
          </Link>
        </h2>
        <p>{article.body.slice(0, 20)}...</p>
        <p>{article?.date.substring(0,10)} at {article?.date.substring(11,16)}</p>
        <p className={styles.author}>added by {article.author}</p>
      </div>
    </>
  );
};
 
export default Article; 