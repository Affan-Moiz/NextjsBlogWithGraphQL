// pages/create.tsx
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CREATE_POST } from '@/graphql/mutations';
import { GET_POSTS } from '@/graphql/queries';
import Header from '@/components/Headers';
import styles from '@/styles/create.module.css';

interface FormData {
  title: string;
  body: string;
  author: string;
}

const schema = yup.object().shape({
  title: yup
    .string()
    .min(5, 'Title must be at least 5 characters long')
    .max(100, 'Title cannot exceed 100 characters')
    .required('Title is required'),
  body: yup
    .string()
    .min(20, 'Body must be at least 20 characters long')
    .max(5000, 'Body cannot exceed 5000 characters')
    .required('Body is required'),
  author: yup
    .string()
    .min(3, 'Author name must be at least 3 characters long')
    .max(50, 'Author name cannot exceed 50 characters')
    .required('Author is required'),
});

export default function CreatePost() {
  const router = useRouter();
  const [createPost] = useMutation(CREATE_POST, {
    update(cache, { data: { createPost } }) {
      try {
        // Attempt to read the existing posts from the cache
        const existingPosts: any = cache.readQuery({
          query: GET_POSTS,
          variables: { page: 1, limit: 5 },
        });

        // If existingPosts exists, update the cache; otherwise, add the new post
        cache.writeQuery({
          query: GET_POSTS,
          variables: { page: 1, limit: 5 },
          data: {
            posts: existingPosts ? [createPost, ...existingPosts.posts] : [createPost],
          },
        });
      } catch (error) {
        console.error('Error updating cache:', error);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createPost({
        variables: data,
        optimisticResponse: {
          createPost: {
            __typename: 'Post',
            id: 'temp-id',
            title: data.title,
            body: data.body,
            author: data.author,
            publishedDate: new Date().toISOString(),
          },
        },
      });
      router.push('/');
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  return (
    <div className={styles.outerContainer}>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.header}>Create a New Blog Post</h1>
        <p className={styles.description}>
          Fill in the details below to create a new blog post.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input
              className={`${styles.input} ${errors.title ? styles.errorInput : ''}`}
              {...register('title')}
              placeholder="Enter the blog title"
            />
            {errors.title && <p className={styles.error}>{errors.title.message}</p>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Body</label>
            <textarea
              className={`${styles.textarea} ${errors.body ? styles.errorInput : ''}`}
              {...register('body')}
              placeholder="Write your blog content here..."
            />
            {errors.body && <p className={styles.error}>{errors.body.message}</p>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Author</label>
            <input
              className={`${styles.input} ${errors.author ? styles.errorInput : ''}`}
              {...register('author')}
              placeholder="Enter the author's name"
            />
            {errors.author && <p className={styles.error}>{errors.author.message}</p>}
          </div>
          <button className={styles.button} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Post'}
          </button>
        </form>
      </div>
    </div>
  );
}
