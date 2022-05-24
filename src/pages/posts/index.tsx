import { RichText } from 'prismic-dom';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}

interface PostsProps {
    posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
    const [date, setDate] = useState("");
    useEffect (() => {
        const dt = new Date();
        setDate(`${dt.getHours()}: ${dt.getMinutes()}: ${dt.getSeconds()}`);
    } , []);

    return (
        <>
            <Head>
                <title>Posts | ignews</title>
            </Head>

            <main className={styles.container} >
                <div className={styles.posts} >

                    { 
                        posts.map((post) => (
                            <Link key={ post.slug } href={`/posts/${ post.slug }`}>
                                <a>
                                    <time>{ post.updatedAt }</time>
                                    <strong>{ post.title }</strong>
                                    <p>{ post.excerpt }</p>
                                </a>
                            </Link>
                        ))}
                </div>
            </main>
        </>
    );
}

//  Retorna os dados do CMS
export const getStaticProps: GetStaticProps = async () => {
    const Clientprismic = getPrismicClient();

    const response = await Clientprismic.getByType("Publication", {
        fetch: ["Publication.title", "Publication.content"],
        pageSize: 100,
      });
    
    const posts = response.results.map((post) => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find((content) => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }),
        }
    });

    return {
        props: { posts }
    }
}