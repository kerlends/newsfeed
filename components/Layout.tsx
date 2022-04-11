import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";

export interface FellowshipLinkItem {
  label: React.ReactNode;
  fellowship: string;
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
      <Content>
        <Nav>
          <Link href="/" passHref>
            <NavLink isActive={!query?.fellowship}>Home</NavLink>
          </Link>
          {fellowshipItems.map(({ fellowship, label }) => (
            <Link key={fellowship} href={`/fellowship/${fellowship}`} passHref>
              <NavLink isActive={fellowship === query?.fellowship}>
                {label}
              </NavLink>
            </Link>
          ))}
        </Nav>
        <Main>{children}</Main>
      </Content>
    </Container>
  );
}

interface NavLinkProps {
  isActive?: boolean;
}

const navLinkActiveStyles = css`
  color: #111827;
  opacity: 1;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0.25rem;
    left: 1rem;
    width: calc(100% - 2rem);
    height: 1px;
    background-color: #111827;
  }
`;

const NavLink = styled.a<NavLinkProps>`
  color: #4b5563;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  opacity: 0.9;
  &:hover,
  &:focus {
    color: #111827;
  }
  ${(props) => (props.isActive ? navLinkActiveStyles : null)}
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  background: #0284c7;
`;

const Content = styled.div`
  max-height: 90vh;
  max-width: 1024px;
  height: 100%;
  width: 100%;
  display: flex;
  margin: auto;
  background-color: white;
  border-radius: 8px;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  @media (max-width: 600px) {
    max-height: 100vh;
  }
`;

const Main = styled.main`
  padding: 1rem;
  margin-top: 0.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid #d1d5db;

  @media (max-width: 600px) {
    gap: 0.5rem;
  }
`;
