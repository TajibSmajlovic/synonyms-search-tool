import { useState, useEffect } from 'react';

import { useApi } from 'hooks/api';
import { useSpinDelay, usePaginate } from 'hooks';
import { buildQueryPath } from 'utils/helpers';
import { ENDPOINT_ROUTES } from 'utils/constants';

export const useGetWords = (keyword) => {
  const { page, pageSize, handlePageChange } = usePaginate();
  const path = buildQueryPath(ENDPOINT_ROUTES.WORDS, {
    keyword,
    page,
    pageSize,
  });

  const [{ result, isLoading: isLoadingWords }] = useApi(path);
  const [words, setWords] = useState([]);
  const isLoading = useSpinDelay(isLoadingWords);

  const loadMoreWords = () => {
    const doNotLoad = isLoading || words.length >= result?.data?.total;
    if (doNotLoad) return;

    handlePageChange();
  };

  // reset words upon keyword change
  useEffect(() => {
    setWords([]);
    handlePageChange(1);
  }, [handlePageChange, keyword]);

  // appending new words upon scrolling
  useEffect(() => {
    if (result?.data?.words) {
      setWords((prevState) => [...prevState, ...result.data.words]);
    }
  }, [result?.data?.words]);

  return {
    words,
    isLoading,
    loadMoreWords,
  };
};
