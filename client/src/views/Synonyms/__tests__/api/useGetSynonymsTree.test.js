import { renderHook } from '@testing-library/react-hooks';

import { RootProvider } from 'context';
import { synonymsTree } from 'utils/tests/mockedData';
import { useGetSynonymsTree } from 'views/Synonyms/api/useGetSynonymsTree';

describe('useGetSynonymsTree', () => {
  it('should fetch synonyms tree', async () => {
    const { result, waitFor } = renderHook(() => useGetSynonymsTree('test'), {
      wrapper: RootProvider,
    });

    expect(result.current.synonyms).toEqual({});

    await waitFor(() => {
      expect(result.current.synonyms).toEqual(synonymsTree);
    });
  });
});
