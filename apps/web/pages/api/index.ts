import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "@repo/graphql/schema";
import { resolvers } from "@repo/graphql/resolvers";
import type { NextApiRequest, NextApiResponse } from "next";

const server = new ApolloServer({ typeDefs, resolvers });
const startServer = server.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  return server.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = { api: { bodyParser: false } };
