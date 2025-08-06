import { ApolloServer } from "apollo-server";

import { createContext } from "./context";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 GraphQL Server ready at ${url}`);
});
