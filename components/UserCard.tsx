import Link from "next/link";
import styled from "styled-components";
import Card from "./Card";
import Markdown from "./Markdown";
import type { UserQuery } from "generated/graphql";

type User = NonNullable<UserQuery["user"]>;

type Project = NonNullable<User["projects"]>[number];

interface UserCardProps {
  user: User;
  hideProjects?: boolean;
  style?: React.CSSProperties;
}

export default function UserCard({ user, hideProjects, style }: UserCardProps) {
  return (
    <Card style={style}>
      <Columns>
        <ColumnLeft>
          <Avatar src={user.avatarUrl} />
        </ColumnLeft>
        <ColumnRight>
          <h2>{user.name}</h2>
          <p>Fellowship: {user.fellowship}</p>
          <Markdown>{user.bio}</Markdown>
          {!hideProjects && !!user.projects?.length && (
            <>
              <h3>Projects:</h3>
              {user.projects.map((p) => (
                <Project key={p.id} project={p} />
              ))}
            </>
          )}
        </ColumnRight>
      </Columns>
    </Card>
  );
}

const Avatar = styled.img`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`;

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 7rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1.5rem;
`;

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`;

function Project({ project }: { project: Project }) {
  return (
    <ProjectContainer>
      <ProjectColumnLeft>
        <ProjectIcon src={project.iconUrl} />
      </ProjectColumnLeft>
      <ProjectColumnRight>
        <Link href={`/projects/${project.id}`}>{project.name}</Link>
      </ProjectColumnRight>
    </ProjectContainer>
  );
}

const ProjectIcon = styled.img`
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const ProjectColumnLeft = styled.div`
  flex-basis: 2rem;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 1rem;
`;

const ProjectColumnRight = styled.div`
  flex-basis: 3rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
