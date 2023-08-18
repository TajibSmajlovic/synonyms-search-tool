import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { RootProvider } from 'context';
import Synonyms from '../Synonyms';
import { synonymsTree } from 'utils/tests/mockedData';

const renderWithRootProvider = (ui) =>
  render(<RootProvider>{ui}</RootProvider>);

describe('Synonyms', () => {
  it('opening and closing Add Synonyms Modal works properly', async () => {
    renderWithRootProvider(<Synonyms />);

    expect(screen.queryByTestId('add-synonyms-modal')).not.toBeInTheDocument();

    const addButton = screen.getByText('Add Synonym');
    fireEvent.click(addButton);

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('modal-suspense-fallback'),
    );

    expect(screen.getByTestId('add-synonyms-modal')).toBeInTheDocument();

    const closeButton = screen.getByText('Cancel');
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('add-synonyms-modal')).not.toBeInTheDocument();
  });

  it('displays Synonyms list and tree when a word is found', async () => {
    renderWithRootProvider(<Synonyms />);

    const searchbox = screen.getByPlaceholderText(
      'Type to search for synonyms',
    );

    fireEvent.change(searchbox, { target: { value: 'non existing word' } });

    await waitFor(() => {
      expect(screen.queryByTestId('synonyms-list')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByTestId('synonyms-tree')).not.toBeInTheDocument();
    });

    fireEvent.change(searchbox, { target: { value: synonymsTree.word } });

    await waitFor(
      () => {
        expect(screen.getByTestId('synonyms-list')).toBeInTheDocument();
      },
      {
        timeout: 1500, // adding a timeout because of the animation & showSynonyms state
      },
    );

    await waitFor(() => {
      expect(screen.getByTestId('synonyms-tree')).toBeInTheDocument();
    });
  });
});
