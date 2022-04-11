import Head from "next/head";
import Layout from "components/Layout";
import AnnouncementsList from "components/AnnouncementsList";
import styled from "styled-components";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <Container>
        <h1>Announcements</h1>
        <AnnouncementsList fellowship="all" />
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  flex: 1;
  margin: 0 auto;
`;
