import Link from "next/link";
import styled from "styled-components";

const StyledAnchor = styled.a`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

export default function GoBackLink() {
  return (
    <Link href="..">
      <StyledAnchor>Go back</StyledAnchor>
    </Link>
  );
}
