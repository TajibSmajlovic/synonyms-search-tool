import styled from 'styled-components';

import { SCREEN_BREAKPOINTS } from 'utils/constants';

export const Container = ({ children, ...rest }) => (
  <StyledContainer {...rest}>{children}</StyledContainer>
);

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;

  @media screen and (width <= ${SCREEN_BREAKPOINTS.TABLET}px) {
    padding: 0.875rem;
  }
`;
