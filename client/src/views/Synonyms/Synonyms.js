//#region Imports
import styled from 'styled-components';
import { useState, lazy, Suspense } from 'react';

import {
  Container as DefaultContainer,
  If,
  Searchbox,
  FloatingButton,
} from 'components';
import { useIsMobileKeyboardOpen, useSearchbox } from 'hooks';
import { SCREEN_BREAKPOINTS } from 'utils/constants';

import { useGetSynonyms } from './api/useGetSynonyms';
import { useAddSynonyms } from './api/useAddSynonyms';

/*
  prefetching the synonyms tree and the synonyms list components
  this means once the search is performed, the tree and the list components will be loaded from the cache
*/
const SynonymsList = lazy(() =>
  import(/* webpackPrefetch: true */ './SynonymsList'),
);
const SynonymsTree = lazy(() =>
  import(/* webpackPrefetch: true */ './SynonymsTree'),
);

const loadAdvancedModal = () => import('./AddSynonymsModal'); // used for eager loading the modal
const AddSynonymsModal = lazy(loadAdvancedModal);
//#endregion Imports

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
          placeholder="Type to search for synonyms"
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
        <FloatingButton
          onClick={initiateAddSynonyms}
          onMouseEnter={loadAdvancedModal} // eager loading the modal
        >
          Add Synonym
        </FloatingButton>
      )}

      <If predicate={isModalOpen}>
        <Suspense fallback={<div data-testid="modal-suspense-fallback" />}>
          <AddSynonymsModal
            isOpen={isModalOpen}
            isAddingSynonyms={isAdding}
            initialWord={word}
            onClose={closeModal}
            onSubmit={onSubmit}
            error={addSynonymApiError?.message}
          />
        </Suspense>
      </If>
    </Container>
  );
};

//#region Styles
const Container = styled(DefaultContainer)`
  flex-basis: 100%;
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
    min-width: 60%;
    align-self: center;
  }
`;
//#endregion Styles

export default Synonyms;
