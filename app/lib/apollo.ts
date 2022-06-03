import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_TODO_API_URL, // エンドポイント設定
  cache: new InMemoryCache(), // キャッシュ設定
});

export default apolloClient;
