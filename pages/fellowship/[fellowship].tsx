import { useRouter } from "next/router";
import styled from "styled-components";

import Layout from "components/Layout";
import AnnouncementsList from "components/AnnouncementsList";
import PeopleOfInterestList from "components/PeopleOfInterestList";

export default function FellowshipAnnouncementsPage() {
  const { query } = useRouter();

  const fellowship = query?.fellowship as string;

  return (
    <Layout>
      <Container>
        <Column>
          <h1>Announcements</h1>
          <AnnouncementsList fellowship={fellowship} />
        </Column>
        <Column>
          <h1>People of interest</h1>
          <PeopleOfInterestList fellowship={fellowship} />
        </Column>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Column = styled.div`
  flex: 1;
  max-height: calc(100vh - 6rem);
`;
