const { ApolloServer, gql } = require('apollo-server');
const { v4: uuidv4 } = require('uuid');

let posts = [
  {
    id: '1',
    title: 'First Post',
    body: 'This is the first post.',
    author: 'John Doe',
    publishedDate: '2023-10-01',
  },
];

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    author: String!
    publishedDate: String!
  }

  type Query {
    posts(page: Int, limit: Int): [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, body: String!, author: String!): Post!
  }
`;

const resolvers = {
  Query: {
    posts: (_, { page = 1, limit = 5 }) => {
      const start = (page - 1) * limit;
      return posts.slice(start, start + limit);
    },
    post: (_, { id }) => posts.find(post => post.id === id),
  },
  Mutation: {
    createPost: (_, { title, body, author }) => {
      const newPost = {
        id: uuidv4(),
        title,
        body,
        author,
        publishedDate: new Date().toISOString(),
      };
      posts.unshift(newPost);
      return newPost;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
