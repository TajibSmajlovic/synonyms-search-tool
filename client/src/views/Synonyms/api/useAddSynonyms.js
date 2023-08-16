import { useApi, useApiNotification } from 'hooks/api';
import { HTTP_VERBS } from 'utils/constants';
import { ENDPOINT_ROUTES } from 'constants';

export const useAddSynonyms = () => {
  const [{ result, isLoading, error }, addSynonyms] = useApi(
    ENDPOINT_ROUTES.SYNONYMS,
    {
      verb: HTTP_VERBS.POST,
      initialFetch: false,
      throwOnError: true,
    },
  );

  useApiNotification({
    result,
    successMessage: result?.message,
  });

  return {
    addSynonyms,
    isLoading,
    error,
  };
};
