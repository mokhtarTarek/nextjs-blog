import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css'
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/Date';

export default function Post({ postData }) {
    return <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>
}

// the route of this template page is dynamic,
// this means it depends on external data
// we need to return all the possible paths from external data 

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,// an array of object [{params:{id:filename}}]
        fallback: false,
    };
}
// now the 
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}