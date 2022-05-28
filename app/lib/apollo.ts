import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://localhost:3001/api/graphql", // エンドポイント設定
  cache: new InMemoryCache(), // キャッシュ設定
});

export default apolloClient;
