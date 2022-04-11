import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  extend type Query {
    announcements(input: AnnouncementsQueryInput): AnnouncementsQueryResult
  }

  type Announcement {
    id: Int!
    fellowship: String
    title: String!
    body: String!
    createdAt: DateTime!
  }

  type AnnouncementsQueryResult {
    data: [Announcement!]!
    total: Int!
  }

  input AnnouncementsQueryInput {
    take: Int
    skip: Int
    where: AnnouncementsQueryWhereInput
  }

  input AnnouncementsQueryWhereInput {
    fellowship: StringWhereInput
    title: StringWhereInput
    body: StringWhereInput
  }
`;
