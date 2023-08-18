import { useApi, useApiNotification } from 'hooks/api';
import { HTTP_VERBS, ENDPOINT_ROUTES } from 'utils/constants';

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
