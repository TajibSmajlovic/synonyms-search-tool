import { render, screen, waitFor } from '@testing-library/react';

import SynonymsTree from '../SynonymsTree';
import { synonymsTree } from 'utils/tests/mockedData';
import { RootProvider } from 'context';
import {
  flatSynonymsTreeToDirectChildren,
  mapFlattenedSynonymsTreeToListOfObject,
  mapSynonymsTreeListOfObjectsToOneList,
} from 'utils/helpers';

describe('SynonymsTree', () => {
  it('renders all tree items', async () => {
    render(
      <RootProvider>
        <SynonymsTree word={synonymsTree.word} />
      </RootProvider>,
    );

    // wait until the tree is rendered
    await waitFor(() => {
      const rootNode = screen.getByText(synonymsTree.word);
      expect(rootNode).toBeInTheDocument();
    });

    // generate a list of all synonyms from a tree
    let allSynonyms = flatSynonymsTreeToDirectChildren(synonymsTree.tree);
    allSynonyms = mapFlattenedSynonymsTreeToListOfObject(allSynonyms);
    allSynonyms = mapSynonymsTreeListOfObjectsToOneList(allSynonyms);

    allSynonyms.forEach((synonym) => {
      const synonymNode = screen.getByText(synonym);
      expect(synonymNode).toBeInTheDocument();
    });
  });
});
