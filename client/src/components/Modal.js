import styled from 'styled-components';
import { useEffect } from 'react';

import { CloseIcon } from 'assets/Icons';
import { If, PreventPropagation } from 'components';
import { SCREEN_BREAKPOINTS } from 'utils/constants';

//#region Components
export const Modal = ({ isOpen, onClose, children }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <If predicate={isOpen}>
      <Wrapper onClick={onClose}>
        <PreventPropagation>
          <ModalContent>{children}</ModalContent>
        </PreventPropagation>
      </Wrapper>
    </If>
  );
};

export const ModalHeader = styled(({ children, onClose, ...rest }) => (
  <div {...rest}>
    <h2>{children}</h2>
    <button onClick={onClose}>
      <CloseIcon width={25} height={25} />
    </button>
  </div>
))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.875rem;
  border-bottom: 1px solid var(--gray_200);
  width: 100%;

  h2 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1;
    letter-spacing: 0.18px;
    text-align: left;
    color: var(--gray_700);
  }

  button {
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem 0.5rem;
  width: 100%;

  @media screen and (width >= ${SCREEN_BREAKPOINTS.TABLET}px) {
    padding: 2rem 1rem;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--gray_200);
  width: 100%;
  gap: 1rem;

  @media screen and (width >= ${SCREEN_BREAKPOINTS.TABLET}px) {
    flex-direction: row;
    justify-content: flex-end;

    button {
      width: min-content;
    }
  }
`;
//#endregion Components

//#region Styles
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1.3rem;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  width: min(100%, 600px);
  margin: auto;
  background-color: var(--white);
  padding: 1.5rem;
`;
//#endregion Styles
