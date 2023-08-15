import styled from 'styled-components';

export const Header = () => (
  <StyledHeader>
    <Text>Synonyms Search Tool</Text>
  </StyledHeader>
);

const StyledHeader = styled.header`
  padding: 1.5rem;
  text-align: center;
`;

const Text = styled.h2`
  font-size: 2rem;
  font-style: italic;
  font-weight: 400;
`;
