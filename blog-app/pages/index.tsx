// pages/index.tsx
import { GET_POSTS } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import Tile from '@/components/Tile';
import Header from '@/components/Headers';
import styles from '@/styles/index.module.css';

interface Post {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
}

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery(GET_POSTS, {
    variables: { page, limit: 5 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => prev + 1);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.header}>Blog Posts</h1>
        <div className={styles.postsContainer}>
          {data.posts.map((post: Post) => (
            <Tile
              key={post.id}
              id={post.id}
              title={post.title}
              author={post.author}
              publishedDate={post.publishedDate}
            />
          ))}
        </div>
        <div className={styles.paginationContainer}>
          <button
            className={styles.paginationButton}
            onClick={handlePrevious}
            disabled={page === 1}
          >
            Previous
          </button>
          <button className={styles.paginationButton} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
