import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!, $author: String!) {
    createPost(title: $title, body: $body, author: $author) {
      id
      title
      publishedDate
    }
  }
`;
