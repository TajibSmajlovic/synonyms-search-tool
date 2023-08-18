import { renderHook } from '@testing-library/react-hooks';

import { RootProvider } from 'context';
import { wordsList } from 'utils/tests/mockedData';
import { useGetWords } from 'views/Synonyms/api/useGetWords';

describe('useGetWords', () => {
  it('should fetch words list', async () => {
    const { result, waitFor } = renderHook(() => useGetWords('test'), {
      wrapper: RootProvider,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.words).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.words).toEqual(wordsList);
    });
  });
});
