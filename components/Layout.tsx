import { Fellowship } from "generated/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export interface FellowshipLinkItem {
  label: React.ReactNode;
  fellowship: Fellowship;
}

type LayoutProps = React.PropsWithChildren<{}>;

const fellowshipItems: FellowshipLinkItem[] = [
  { label: "Founders", fellowship: "founders" },
  { label: "Angels", fellowship: "angels" },
  { label: "Writers", fellowship: "writers" },
];

export default function Layout({ children }: LayoutProps) {
  const { query } = useRouter();
  return (
    <Container>
      <Nav>
        <Link href="/">
          <NavLink isActive={!query?.fellowship}>Home</NavLink>
        </Link>
        {fellowshipItems.map(({ fellowship, label }) => (
          <Link key={fellowship} href={`/fellowship/${fellowship}`}>
            <NavLink isActive={fellowship === query?.fellowship}>
              {label}
            </NavLink>
          </Link>
        ))}
      </Nav>
      <Main>{children}</Main>
    </Container>
  );
}

interface NavLinkProps {
  isActive?: boolean;
}

const NavLink = styled.a<NavLinkProps>`
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  text-decoration: ${(props) => (props.isActive ? "underline" : "none")};
`;

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  padding: 0 0.5rem;
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Main = styled.main`
  padding: 1.5rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.aside`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: row;
    padding: 1rem 0.5rem;
  }
`;
