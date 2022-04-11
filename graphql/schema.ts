import { gql, makeExecutableSchema } from "apollo-server-micro";
import merge from "lodash.merge";
import * as announcements from "./announcements";
import * as projects from "./projects";
import * as users from "./users";

const typeDefs = gql`
  type Query {
    ping: String
  }

  input StringWhereInput {
    equals: String
    contains: String
    startsWith: String
    endsWith: String
    not: StringWhereInput
    in: [String!]
  }

  scalar DateTime
`;

export const schema = makeExecutableSchema({
  typeDefs: [
    announcements.typeDefs,
    projects.typeDefs,
    users.typeDefs,
    typeDefs,
  ],
  resolvers: merge(
    {},
    announcements.resolvers,
    projects.resolvers,
    users.resolvers
  ) as any,
});
