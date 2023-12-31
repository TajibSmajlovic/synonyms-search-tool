//#region Imports
import styled from 'styled-components';
import { useEffect, useMemo } from 'react';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Alert,
  MultiSelect,
  Collapse,
  If,
  Selected as DefaultSelected,
  Tooltip as DefaultTooltip,
} from 'components';
import {
  generateId,
  flatSynonymsTreeToDirectChildren,
  mapFlattenedSynonymsTreeToListOfObject,
  mapSynonymsTreeListOfObjectsToOneList,
} from 'utils/helpers';
import { useThrottle, useMultiSelect, useDebounce } from 'hooks';

import { useGetWords } from './api/useGetWords';
import { useGetSynonymsTree } from './api/useGetSynonymsTree';
import { useAddSynonymsForm } from './utils/useAddSynonymsForm';
//#endregion Imports

const AddSynonymsModal = ({
  isOpen,
  initialWord,
  onClose,
  onSubmit,
  isAddingSynonyms,
  error: apiError,
}) => {
  const {
    onInputChange,
    items,
    populatePreselectedItems,
    handleItemSelect,
    clearState: clearMultiSelectState,
    inputValue: multiSelectInputValue,
    ...remainingMultiSelectProps
  } = useMultiSelect();
  const {
    word,
    onWordChange: onInputWordChange,
    errors,
    setWordError,
    setSynonymsError,
  } = useAddSynonymsForm(initialWord);

  const throttledSynonymValue = useThrottle(multiSelectInputValue);
  const { debouncedValue: debouncedKeyword } = useDebounce(word);

  const { words, loadMoreWords } = useGetWords(throttledSynonymValue);
  const { synonyms } = useGetSynonymsTree(debouncedKeyword);

  const multiSelectOptions = useMemo(
    () => words.map((word) => ({ id: generateId(), label: word, value: word })),
    [words],
  );

  // flattened synonyms tree list that will be used for displaying preselected synonyms in multiselect and for checking synonyms to remove in handleSubmit()
  const flattenedSynonymsTreeList = useMemo(() => {
    if (!synonyms?.tree) return [];

    const flattenedTree = flatSynonymsTreeToDirectChildren(synonyms.tree);
    const flattenedTreeList =
      mapFlattenedSynonymsTreeToListOfObject(flattenedTree);

    return flattenedTreeList;
  }, [synonyms]);

  // preselected multiselect items that are loaded from the synonyms tree
  const preselectedItems = useMemo(
    () =>
      flattenedSynonymsTreeList.map((synonym) => ({
        id: generateId(),
        value: synonym.word,
        label: synonym.synonyms,
      })),
    [flattenedSynonymsTreeList],
  );

  const onWordChange = (event) => {
    onInputWordChange(event);

    if (event.target.value === '') {
      clearMultiSelectState();
    }
  };

  const onSelectInputValueChange = (event) => {
    onInputChange(event);

    if (Boolean(errors.synonyms)) setSynonymsError();
  };

  // guard that prevents adding duplicate values
  const canAddItem = (item) => {
    if (item.value === word) return false;

    const preselectedItems = mapSynonymsTreeListOfObjectsToOneList(
      items.preselected,
      'value',
      'label',
    );
    const relatedItems = [
      ...items.selected.map((item) => item.value),
      ...preselectedItems,
    ];

    return !relatedItems.includes(item.value);
  };

  const handleMultiSelectAdd = (item) => {
    if (!canAddItem(item)) return;

    handleItemSelect(item);

    if (Boolean(errors.synonyms)) setSynonymsError();
  };

  const checkForErrors = () => {
    let hasAnyError = false;

    if (!Boolean(word)) {
      setWordError('Word is required');
      hasAnyError = true;
    }

    if (items.preselected.length === 0 && items.selected.length === 0) {
      setSynonymsError('Synonyms are required');
      hasAnyError = true;
    }

    if (items.selected.includes(word)) {
      setSynonymsError('Synonyms cannot contain the word itself');
      hasAnyError = true;
    }

    return hasAnyError;
  };

  const handleSubmit = () => {
    if (checkForErrors()) return;

    const preselectedSynonyms = items.preselected.map((item) => item.value);
    const synonymsToAdd = items.selected.map((item) => item.value);
    const synonymsToRemove = flattenedSynonymsTreeList
      .filter((synonym) => !preselectedSynonyms.includes(synonym.word))
      .map((item) => item.word)
      .filter(Boolean);

    const body = {
      word,
      synonyms: {
        toAdd: synonymsToAdd,
        toRemove: synonymsToRemove,
      },
    };

    onSubmit(body);
  };

  useEffect(() => {
    if (preselectedItems) {
      populatePreselectedItems(preselectedItems);
    }
  }, [populatePreselectedItems, preselectedItems]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} data-testid="add-synonyms-modal">
      <ModalHeader onClose={onClose}>Add Synonym</ModalHeader>
      <ModalBody>
        <If predicate={Boolean(apiError)}>
          <Alert variant="error" style={{ textAlign: 'center' }}>
            {apiError}
          </Alert>
          <br />
        </If>
        <Collapse title="Things to keep in mind">
          <InfoWrapper>
            <Alert variant="warning">
              <ul>
                <li>
                  The synonyms will be loaded automatically if the entered word
                  already contains a synonyms.
                </li>
                <li>
                  Synonym won't be selected if it already exists directly or
                  transitively.
                </li>
              </ul>
            </Alert>
            <Alert variant="info">
              <ul>
                <li>Newly selected synonyms will have greenish color.</li>
                <li>
                  Synonyms with the yellowish color contain transient synonyms.
                  You can hover over them to see the transient synonyms.
                </li>
              </ul>
            </Alert>
          </InfoWrapper>
        </Collapse>
        <br />
        <Input value={word} error={errors.word} onChange={onWordChange} />
        <br />
        <MultiSelect
          placeholder="Enter synonym"
          inputValue={multiSelectInputValue}
          onInputChange={onSelectInputValueChange}
          options={multiSelectOptions}
          selectedItems={items.selected}
          preselectedItems={items.preselected}
          error={errors.synonyms}
          handleScroll={loadMoreWords}
          handleItemSelect={handleMultiSelectAdd}
          PreselectedValueComponent={PreselectedValueComponent}
          {...remainingMultiSelectProps}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          isLoading={isAddingSynonyms}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button type="outline" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const PreselectedValueComponent = ({ item, handleItemRemove, ...rest }) => (
  <Tooltip text={item.label.join(', ')}>
    <Selected
      $hasTransientSynonyms={Boolean(item.label.length)}
      item={item}
      handleItemRemove={handleItemRemove}
      {...rest}
    />
  </Tooltip>
);

const InfoWrapper = styled.div`
  margin: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & div {
    font-size: 0.8rem;
  }
`;

const Tooltip = styled(DefaultTooltip)`
  background-color: var(--warning-background);
  color: var(--warning-color);
  font-size: 0.675rem;
`;

const Selected = styled(DefaultSelected)`
  ${({ $hasTransientSynonyms }) =>
    $hasTransientSynonyms &&
    `
      background-color: var(--warning-background);
      color: var(--warning-color);
    `}
`;

export default AddSynonymsModal;
