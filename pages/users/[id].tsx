import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import Layout from "components/Layout";
import UserCard from "components/UserCard";
import { useUserQuery } from "./[id].generated";

export default function UserPage() {
  const { query } = useRouter();

  const { data, error, loading } = useUserQuery({
    skip: !query.id,
    variables: { id: Number(query.id) },
  });
  const user = data?.user;

  if (!user || loading || error) {
    return null;
  }

  return (
    <Layout>
      <UserCard user={user} />
    </Layout>
  );
}

gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      name
      bio
      fellowship
      avatarUrl
      projects {
        id
        name
        iconUrl
      }
    }
  }
`;
