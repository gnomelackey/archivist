import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Map {
    id: String!
    name: String!
    description: String
  }
  type Query {
    maps: [Map!]!
  }
  type Mutation {
    addMap(name: String!, description: String): Map
  }
`;
