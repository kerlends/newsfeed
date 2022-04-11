import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import Layout from "components/Layout";
import ProjectCard from "components/ProjectCard";

import { useProjectQuery } from "generated/graphql";
import GoBackLink from "components/GoBackLink";

export default function ProjectPage() {
  const { query } = useRouter();
  const { data, error, loading } = useProjectQuery({
    skip: !query.id,
    variables: { id: Number(query.id) },
  });

  const project = data?.project;

  if (!project || loading || error) {
    return null;
  }

  return (
    <Layout>
      <GoBackLink />
      <ProjectCard project={project} />
    </Layout>
  );
}

gql`
  query project($id: Int!) {
    project(id: $id) {
      id
      name
      description
      iconUrl
      users {
        id
        name
        avatarUrl
      }
    }
  }
`;
