import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($page: Int, $limit: Int) {
    posts(page: $page, limit: $limit) {
      id
      title
      publishedDate
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      author
      publishedDate
    }
  }
`;
