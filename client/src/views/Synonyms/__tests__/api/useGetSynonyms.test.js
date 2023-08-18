import { renderHook } from '@testing-library/react-hooks';

import { RootProvider } from 'context';
import { synonymsList } from 'utils/tests/mockedData';
import { useGetSynonyms } from 'views/Synonyms/api/useGetSynonyms';

describe('useGetSynonyms', () => {
  it('should fetch synonyms and handle loading state correctly', async () => {
    const { result, waitFor } = renderHook(() => useGetSynonyms('test'), {
      wrapper: RootProvider,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.synonyms).toEqual([]);
    expect(result.current.showSynonyms).toBe(false);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    await waitFor(() => {
      expect(result.current.showSynonyms).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.synonyms).toEqual(synonymsList);
    });
  });
});
