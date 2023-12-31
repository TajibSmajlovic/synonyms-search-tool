import styled, { keyframes } from 'styled-components';

import { SCREEN_BREAKPOINTS } from 'utils/constants';

const SynonymsList = ({ word, synonyms, isLoading, openModal, children }) => {
  if (isLoading) {
    return (
      <ResultsWrapper $isLoading={isLoading}>
        <ResultMessage>
          Searching for synonyms of <strong>{word}</strong>...
        </ResultMessage>
      </ResultsWrapper>
    );
  }

  return (
    <ResultsWrapper>
      {Boolean(!synonyms.length) ? (
        <ResultMessage>
          No synonyms found found for <strong>{word}</strong>!
          <br />
          Click{' '}
          <span data-testid="toggle-add-synonym-modal" onClick={openModal}>
            here
          </span>{' '}
          to add one.
        </ResultMessage>
      ) : (
        <>
          <ListWrapper data-testid="synonyms-list">
            {synonyms.map((synonym, index) => (
              <Synonym key={index}>{synonym}</Synonym>
            ))}
          </ListWrapper>

          {children}
        </>
      )}
    </ResultsWrapper>
  );
};

//#region Styles
const fadeIn = keyframes`
  0% {
    position: absolute;
    opacity: 0;
  }
  70% {
    opacity: 0;
  }
  100% {
    position: static;
    opacity: 1;
  }
`;

export const ResultMessage = styled.span`
  flex: 1;
  font-weight: 600;
  font-size: 1.1rem;
  opacity: 0.9;
  display: inline-block;
  padding: 0.8rem 1.6rem;
  border-radius: 3px;
  text-align: center;

  span {
    color: var(--primary);
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ResultsWrapper = styled.div`
  background-color: var(--white);
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} calc(var(--animation-duration) + 0.2s) linear;
  align-self: center;
  min-width: 100%;

  ${({ $isLoading }) =>
    $isLoading &&
    `
      opacity: 0.7;
      pointer-events: none;
  `}

  & ${ResultMessage} {
    padding-block: 2rem;
  }

  @media screen and (width >= ${SCREEN_BREAKPOINTS.TABLET}px) {
    padding: 3rem;
  }

  @media screen and (width >= ${SCREEN_BREAKPOINTS.LAPTOP}px) {
    min-width: 60%;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Synonym = styled.span`
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  font-size: 1.1rem;
  opacity: 0.9;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.15);
  display: inline-block;
  padding: 0.8rem 1.6rem;
  border-radius: 3px;
  text-align: center;
`;
//#endregion Styles

export default SynonymsList;
