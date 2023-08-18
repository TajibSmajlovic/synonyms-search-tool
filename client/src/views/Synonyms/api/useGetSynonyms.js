import { useEffect, useMemo, useState } from 'react';

import { useApi, useApiNotification } from 'hooks/api';
import { useSpinDelay } from 'hooks';
import { ENDPOINT_ROUTES } from 'utils/constants';

export const useGetSynonyms = (word) => {
  const path = `${ENDPOINT_ROUTES.SYNONYMS}?word=${word}`;
  const [
    { result, isLoading: isLoadingSynonyms, error },
    refetch,
    cancelRequest,
    resetState,
  ] = useApi(path, {
    initialFetch: false,
  });

  const isLoading = useSpinDelay(isLoadingSynonyms);
  const [showSynonyms, setShowSynonyms] = useState(false);

  const synonyms = useMemo(() => result?.data || [], [result?.data]);

  useApiNotification({
    errorMessage: error?.message,
  });

  useEffect(() => {
    if (word) {
      cancelRequest();
      refetch();
    } else {
      resetState();
      setShowSynonyms(false);
    }
  }, [cancelRequest, refetch, resetState, word]);

  // keeping track when to show synonyms in order to use it with the animation
  useEffect(() => {
    const shouldShow = Boolean(word) && Boolean(result?.data) && !isLoading;

    if (shouldShow) {
      setShowSynonyms(true);
    }
  }, [isLoading, result?.data, word]);

  return {
    synonyms,
    showSynonyms,
    isLoading,
    refetch,
  };
};
