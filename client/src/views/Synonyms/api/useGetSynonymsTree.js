import { useEffect, useMemo } from 'react';

import { useApi, useApiNotification } from 'hooks/api';
import { ENDPOINT_ROUTES } from 'utils/constants';

export const useGetSynonymsTree = (word) => {
  const path = `${ENDPOINT_ROUTES.SYNONYMS_TREE}?word=${word}`;
  const [{ result, error }, refetch, cancelRequest, resetState] = useApi(path, {
    initialFetch: false,
  });

  const synonyms = useMemo(() => result?.data || {}, [result]);

  useApiNotification({
    errorMessage: error?.message,
  });

  useEffect(() => {
    if (word) {
      cancelRequest();
      refetch();
    } else {
      resetState();
    }
  }, [cancelRequest, refetch, resetState, word]);

  return {
    synonyms,
    refetch,
  };
};
