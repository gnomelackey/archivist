import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { createContext } from "./context";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    context: createContext,
    listen: { port: 4002 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
