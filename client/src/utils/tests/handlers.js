import { rest } from 'msw';

import { synonymsList, synonymsTree, wordsList } from './mockedData';
import { ENDPOINT_ROUTES } from 'utils/constants';

export const handlers = [
  rest.get(`*/${ENDPOINT_ROUTES.SYNONYMS}`, (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        data: synonymsList,
      }),
    ),
  ),
  rest.get(`*/${ENDPOINT_ROUTES.SYNONYMS_TREE}`, (req, res, ctx) => {
    const word = req.url.searchParams.get('word');

    return res(
      ctx.status(200),
      ctx.json({
        data: synonymsTree.word === word ? synonymsTree : [],
      }),
    );
  }),
  rest.get(`*/${ENDPOINT_ROUTES.WORDS}`, (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        data: {
          words: wordsList,
          total: wordsList.length,
        },
      }),
    ),
  ),
];
