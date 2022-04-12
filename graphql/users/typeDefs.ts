import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  extend type Query {
    user(id: Int!): User
    users(input: UsersQueryInput): UsersQueryResult!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatarUrl: String!
    fellowship: String
    projects: [Project!]
  }

  type UsersQueryResult {
    data: [User!]!
    total: Int!
  }

  input UsersQueryWhereInput {
    name: StringWhereInput
    bio: StringWhereInput
    fellowship: StringWhereInput
  }

  input UsersQueryInput {
    take: Int
    skip: Int
    where: UsersQueryWhereInput
  }
`;
