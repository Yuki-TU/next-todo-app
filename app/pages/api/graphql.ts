import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import { createContext } from "../../graphql/context";
import { schema } from "../../graphql/schema";

// corsの設定
const cors = Cors();

const apolloServer = new ApolloServer({
  schema, // resolverとtype
  context: createContext, // resolver(schema)でPrismaClientを利用する
});
const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

// graphqlを利用するために必要な設定
export const config = {
  api: {
    bodyParser: false,
  },
};
