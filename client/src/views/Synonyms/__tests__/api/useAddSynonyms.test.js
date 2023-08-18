import { rest } from 'msw';
import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react-hooks';

import { RootProvider } from 'context';
import { useAddSynonyms } from 'views/Synonyms/api/useAddSynonyms';
import { server } from 'setupTests';
import { ENDPOINT_ROUTES } from 'utils/constants';
import { addSynonymsBody } from 'utils/tests/mockedData';

const setup = () => {
  const callback = jest.fn();

  server.use(
    rest.post(`*/${ENDPOINT_ROUTES.SYNONYMS}`, (req, res, ctx) => {
      callback(req.body);

      return res(
        ctx.status(201),
        ctx.json({
          message: 'Synonyms added successfully',
        }),
      );
    }),
  );

  const { result, waitFor } = renderHook(() => useAddSynonyms(), {
    wrapper: RootProvider,
  });

  return {
    result,
    waitFor,
    callback,
  };
};

describe('useAddSynonyms', () => {
  it('should execute add properly', async () => {
    const { result, waitFor, callback } = setup();

    act(() => {
      result.current.addSynonyms(addSynonymsBody);
    });

    await waitFor(() => !result.current.isLoading);

    expect(callback).toHaveBeenCalledWith(addSynonymsBody);
    expect(result.current.error).toBe(null);
  });
});
