import styled from 'styled-components';
import { useState } from 'react';

import {
  Container as DefaultContainer,
  If,
  Searchbox,
  FloatingButton,
} from 'components';
import { useIsMobileKeyboardOpen, useSearchbox } from 'hooks';
import { SCREEN_BREAKPOINTS } from 'utils/constants';

import SynonymsList from './SynonymsList';
import AddSynonymsModal from './AddSynonymsModal';
import { useGetSynonyms } from './api/useGetSynonyms';
import { useAddSynonyms } from './api/useAddSynonyms';
import SynonymsTree from './SynonymsTree';

const Synonyms = () => {
  const isMobileKeyboardOpen = useIsMobileKeyboardOpen();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    debouncedValue: word,
    onClear: onClearSearchbox,
    ...remainingSearchProps
  } = useSearchbox();

  const {
    synonyms,
    showSynonyms,
    isLoading: isSearching,
    refetch: refetchSynonyms,
  } = useGetSynonyms(word);

  const {
    addSynonyms,
    isLoading: isAdding,
    error: addSynonymApiError,
  } = useAddSynonyms(refetchSynonyms);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const initiateAddSynonyms = () => {
    onClearSearchbox();
    openModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (body) => {
    try {
      await addSynonyms(body);

      // If the user searched for a word, we want to refetch the synonyms for that word
      if (Boolean(word)) {
        await refetchSynonyms(word);
      }

      closeModal();
    } catch {}
  };

  return (
    <Container>
      <SearchboxWrapper $showResults={showSynonyms}>
        <Searchbox
          isSearching={isSearching}
          onClear={onClearSearchbox}
          {...remainingSearchProps}
        />
      </SearchboxWrapper>

      <If predicate={showSynonyms}>
        <SynonymsList
          word={word}
          synonyms={synonyms}
          openModal={openModal}
          isLoading={isSearching}
        >
          <SynonymsTree word={word} />
        </SynonymsList>
      </If>

      {!isMobileKeyboardOpen && (
        <FloatingButton onClick={initiateAddSynonyms}>
          Add Synonym
        </FloatingButton>
      )}

      <If predicate={isModalOpen}>
        <AddSynonymsModal
          isOpen={isModalOpen}
          isAddingSynonyms={isAdding}
          initialWord={word}
          onClose={closeModal}
          onSubmit={onSubmit}
          error={addSynonymApiError?.message}
        />
      </If>
    </Container>
  );
};

//#region Styles
const Container = styled(DefaultContainer)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  --animation-duration: 0.9s;

  @media screen and (width >= ${SCREEN_BREAKPOINTS.TABLET}px) {
    --animation-duration: 1s;
  }
`;

const SearchboxWrapper = styled.div`
  flex: ${({ $showResults }) => ($showResults ? 0 : 1)};
  max-height: 80%;
  display: flex;
  align-items: center;
  transition: all var(--animation-duration) ease;

  @media screen and (width >= ${SCREEN_BREAKPOINTS.LAPTOP}px) {
    margin-inline: 20%;
  }
`;
//#endregion Styles

export default Synonyms;
