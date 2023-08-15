import { useEffect } from 'react';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Alert,
  MultiSelect,
} from 'components';
import { useThrottle, useMultiSelect, useDebounce } from 'hooks';

import { useGetWords } from './api/useGetWords';
import { useGetSynonyms } from './api/useGetSynonyms';
import { useAddSynonymsForm } from './utils/useAddSynonymsForm';

const AddSynonymsModal = ({
  isOpen,
  initialWord,
  onClose,
  onSubmit,
  isAddingSynonyms,
}) => {
  const {
    onInputChange,
    items,
    populatePreselectedValues,
    removePreselectedItems,
    handleItemSelect,
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
  const { synonyms } = useGetSynonyms(debouncedKeyword);

  const onWordChange = (event) => {
    onInputWordChange(event);

    if (event.target.value === '') {
      // maybe clear all state, both selected and preselected
      removePreselectedItems();
    }
  };

  const onSelectInputValueChange = (event) => {
    onInputChange(event);

    if (Boolean(errors.synonyms)) setSynonymsError();
  };

  const handleMultiSelectAdd = (item) => {
    // guard that prevents adding synonym to itself
    if (item === word) return;

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

    const body = {
      word,
      synonyms: {
        toAdd: [...items.preselected, ...items.selected],
        toRemove: synonyms.filter(
          (synonym) => !items.preselected.includes(synonym),
        ),
      },
    };

    onSubmit(body);
  };

  useEffect(() => {
    if (synonyms) {
      populatePreselectedValues(synonyms);
    }
  }, [populatePreselectedValues, synonyms]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>Add Synonym</ModalHeader>
      <ModalBody>
        <Alert variant="info">
          The synonyms will be loaded automatically if the entered word already
          contains a synonyms.
        </Alert>
        <br />
        <Input value={word} error={errors.word} onChange={onWordChange} />
        <br />
        <MultiSelect
          placeholder="Enter synonym"
          inputValue={multiSelectInputValue}
          onInputChange={onSelectInputValueChange}
          options={words}
          selectedItems={items.selected}
          preselectedItems={items.preselected}
          error={errors.synonyms}
          handleScroll={loadMoreWords}
          handleItemSelect={handleMultiSelectAdd}
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

export default AddSynonymsModal;
