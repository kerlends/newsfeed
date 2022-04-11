import { ApolloServer } from "apollo-server-micro";
import { schema } from "./schema";
import { db } from "./db";

export const server = new ApolloServer({
  schema,
  introspection: true,
  context: { db },
});
