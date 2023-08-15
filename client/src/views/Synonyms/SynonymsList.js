import styled, { keyframes } from 'styled-components';

const SynonymsList = ({ word, synonyms, isLoading, openModal }) => {
  if (isLoading) {
    return (
      <Wrapper $isLoading={isLoading}>
        <Message>
          Searching for synonyms of <strong>{word}</strong>...
        </Message>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {Boolean(!synonyms.length) ? (
        <Message>
          No synonyms found found for <strong>{word}</strong>!
          <br />
          Click <span onClick={openModal}>here</span> to add one.
        </Message>
      ) : (
        synonyms.map((synonym, index) => (
          <Synonym key={index}>{synonym}</Synonym>
        ))
      )}
    </Wrapper>
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

const Wrapper = styled.div`
  background-color: var(--white);
  border-radius: 4px;
  padding: 3rem;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  animation: ${fadeIn} calc(var(--animation-duration) + 0.2s) linear;

  ${({ $isLoading }) =>
    $isLoading &&
    `
      opacity: 0.7;
      pointer-events: none;
  `}
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

const Message = styled.span`
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
// #endregion Styles

export default SynonymsList;
