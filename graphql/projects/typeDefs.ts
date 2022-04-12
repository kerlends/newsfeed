import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  extend type Query {
    project(id: Int!): Project
  }

  type Project {
    id: Int!
    name: String!
    description: String!
    iconUrl: String!
    users: [User!]
  }
`;
