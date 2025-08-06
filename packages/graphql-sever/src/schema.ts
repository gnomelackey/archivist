import { gql } from "apollo-server";

export const typeDefs = gql`
  type Map {
    id: String!
    name: String!
    description: String
    imageUrl: String
  }

  type Query {
    maps: [Map!]!
  }

  type Mutation {
    addMap(name: String!, description: String, imageUrl: String): Map!
  }
`;
