import styled from 'styled-components';

import { SCREEN_BREAKPOINTS } from 'utils/constants';

export const FloatingButton = ({ onClick, children, ...rest }) => (
  <StyledFloatingButton onClick={onClick} {...rest}>
    {children}
  </StyledFloatingButton>
);

const StyledFloatingButton = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  left: 1.5rem;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  background-color: var(--primary);
  color: var(--white);
  border: none;
  outline: 0;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;

  &:hover {
    box-shadow: 0 2px 10px 3px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  @media screen and (width >= ${SCREEN_BREAKPOINTS.TABLET}px) {
    left: unset;
  }
`;
