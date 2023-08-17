import styled from 'styled-components';

export const Container = ({ children, ...rest }) => (
  <StyledContainer {...rest}>{children}</StyledContainer>
);

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
`;
