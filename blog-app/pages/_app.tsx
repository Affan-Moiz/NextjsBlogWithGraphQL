// pages/_app.tsx
import { ApolloProvider } from '@apollo/client';
import client from '@/src/apolloClient';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
