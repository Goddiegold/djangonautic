import React from 'react';
import { useRouter } from "next/router";
import { getAllArticles } from '@/services/userService';
import { getArticle } from '@/services/userService';
import styles from "@/styles/App.module.css"
import Image from 'next/image';


export async function getStaticProps({ params }) {
    console.log("article-getStaticProps", params)
    const response = await getArticle(params.id)
    console.log("respinse-->", response.data)
    return {
        props: {
            article: response.data
        }
    }
}

export async function getStaticPaths() {
    const paths = []
    //coffeeStores.map(store => paths.push({ params: { id: `${store.id}` } }))
    const response = await getAllArticles()
    response.data.map(article => paths.push({ params: { id: `${article._id}` } }))
    console.log("paths", paths)
    return { paths, fallback: false }
}
function ArticleDetail({ article }) {
    console.log(styles);
    return (
            <div className={styles["article-detail"]}>
        <div className={styles["article"]}>
                <Image src={article.thumb} alt='' width={400} height={400}/>
                <h2>{article.title}</h2>
                <p>{article.body}</p>
                <p>{article.date.substring(0, 10)} at {article.date.substring(11, 16)}</p>
                <p className={styles.author}>added by {article.author}</p>
            </div>
        </div>
    );
}

export default ArticleDetail;