import Head from 'next/head';
import getPrismicClient from '../../services/prismic';
import styles from './styles.module.scss';
import { GetStaticProps } from 'next'
import * as prismic from '@prismicio/client';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | igNews</title>
            </Head>


            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>12 de março de 2022</time>
                        <strong>Creating a Monorepo with lerna & Yarn Workspaces</strong>
                        <p>In this guide , you will learn how to create a Monorepo to manage mutiple packages with a shared </p>
                    </a>


                    <a href='#'>
                        <time>12 de março de 2022</time>
                        <strong>Creating a Monorepo with lerna & Yarn Workspaces</strong>
                        <p>In this guide , you will learn how to create a Monorepo to manage mutiple packages with a shared </p>
                    </a>


                    <a href='#'>
                        <time>12 de março de 2022</time>
                        <strong>Creating a Monorepo with lerna & Yarn Workspaces</strong>
                        <p>In this guide , you will learn how to create a Monorepo to manage mutiple packages with a shared </p>
                    </a>
                </div>
            </main>
        </>
    )
}


export const getStaticProps:GetStaticProps = async () => {
    const prismicClient = getPrismicClient();

    const response = await prismicClient.get({
        predicates: prismic.predicate.at('document.type', 'new-post'),
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100
    })

    console.log(JSON.stringify(response, null, 2))

    return {
        props: {

        }
    }
}