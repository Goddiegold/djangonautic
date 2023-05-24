import React from 'react';
import { getAllArticles } from '@/services/userService';
import { getArticle } from '@/services/userService';
import styles from "@/styles/App.module.css"
import Image from 'next/image';
import useSWR from 'swr'
import { useRouter } from 'next/router';


export async function getStaticProps({ params }) {
    const response = await getArticle(params.id)
    return {
        props: {
            article: response.data
        },
        revalidate: 1
    }
}

export async function getStaticPaths() {
    const paths = []
    const response = await getAllArticles()
    response.data.map(article => paths.push({ params: { id: `${article._id}` } }))
    console.log("paths", paths)
    return { paths, fallback: false }
}
function ArticleDetail({ article }) {
    const { query } = useRouter()
    console.log(query);

    return (
        <div className={styles["article-detail"]}>
            <div className={styles["article"]}>
                <Image src={article.thumb ? article.thumb : "/img/default.png"} alt='' width={400} height={400} />
                <h2>{article.title}</h2>
                <p>{article.body}</p>
                <p>{article.date.substring(0, 10)} at {article.date.substring(11, 16)}</p>
                <p className={styles.author}>added by {article.author}</p>
            </div>
        </div>

    );
}

export default ArticleDetail;