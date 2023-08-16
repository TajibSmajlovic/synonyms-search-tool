import styled from 'styled-components';

import { ArrowIcon as Arrow } from 'assets/Icons';
import { useToggle } from 'hooks';

export const Collapse = ({ title, initialOpenValue, children }) => {
  const [isOpen, toggle] = useToggle(initialOpenValue);

  return (
    <CollapseWrapper>
      <CollapseHeader onClick={toggle}>
        {title}
        <ArrowIcon $isOpen={isOpen}>
          <Arrow height={12} width={12} />
        </ArrowIcon>
      </CollapseHeader>
      <CollapseContent $isOpen={isOpen}>{children}</CollapseContent>
    </CollapseWrapper>
  );
};

// #region Styles
const CollapseWrapper = styled.div`
  --collapse-animation-duration: 0.6s;

  border: 1px solid var(--gray_300);
  overflow: hidden;
`;

const CollapseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.675rem;
  font-size: 0.875rem;
  background-color: var(--gray_100);
  cursor: pointer;

  &:hover {
    background-color: var(--gray_200);
  }
`;

const ArrowIcon = styled.span`
  transition: transform var(--collapse-animation-duration);
  transform: ${({ $isOpen }) =>
    !$isOpen ? 'rotate(0deg)' : 'rotate(-180deg)'};
`;

const CollapseContent = styled.div`
  max-height: 0;
  opacity: 0;
  background-color: var(--white);
  overflow: hidden;
  transition:
    max-height calc(var(--collapse-animation-duration) - 0.2s),
    opacity calc(var(--collapse-animation-duration) - 0.2s);

  ${({ $isOpen }) =>
    $isOpen &&
    `
      max-height: 1000px;
      opacity: 1;
    `}
`;
//#endregion Styles
