import { useState } from 'react';

export const useAddSynonymsForm = (initialWord = '') => {
  const [word, setWord] = useState(initialWord);
  const [errors, setErrors] = useState({
    word: '',
    synonyms: '',
  });

  const onWordChange = (event) => {
    setWord(event.target.value);

    if (Boolean(errors.word)) setWordError();
  };

  const setWordError = (error = '') => {
    setErrors((prevState) => ({
      ...prevState,
      word: error,
    }));
  };

  const setSynonymsError = (error = '') => {
    setErrors((prevState) => ({
      ...prevState,
      synonyms: error,
    }));
  };

  return {
    word,
    onWordChange,
    errors,
    setWordError,
    setSynonymsError,
  };
};
