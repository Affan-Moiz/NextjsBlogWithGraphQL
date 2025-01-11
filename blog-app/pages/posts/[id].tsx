// pages/posts/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import client from '@/src/apolloClient';
import { GET_POST, GET_POSTS } from '@/graphql/queries';
import Header from '../../components/Headers';
import styles from '@/styles/post.module.css';

interface PostProps {
  post: {
    id: string;
    title: string;
    body: string;
    author: string;
    publishedDate: string;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: GET_POSTS,
    variables: { page: 1, limit: 100 },
  });

  const paths = data.posts.map((post: any) => ({
    params: { id: post.id },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data } = await client.query({
      query: GET_POST,
      variables: { id: params?.id },
    });

    if (!data.post) {
      return { notFound: true };
    }

    return {
      props: {
        post: data.post,
      },
      revalidate: 10, // ISR: Revalidate every 10 seconds
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default function PostPage({ post }: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.author}>By {post.author}</p>
        <p className={styles.date}>
          {new Date(post.publishedDate).toLocaleDateString()}
        </p>
        <p className={styles.body}>{post.body}</p>
      </div>
    </div>
  );
}
