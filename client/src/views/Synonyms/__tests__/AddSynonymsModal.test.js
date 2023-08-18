import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import AddSynonymsModal from '../AddSynonymsModal';
import { RootProvider } from 'context';
import { wordsList } from 'utils/tests/mockedData';

const renderWithRootProvider = (ui) =>
  render(<RootProvider>{ui}</RootProvider>);

describe('AddSynonymsModal', () => {
  it('renders the modal with correct elements', () => {
    renderWithRootProvider(<AddSynonymsModal isOpen={true} />);

    expect(screen.getByText('Add Synonym')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter synonym')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('triggers onClose when cancel button is clicked', () => {
    const onCloseMock = jest.fn();

    renderWithRootProvider(
      <AddSynonymsModal isOpen={true} onClose={onCloseMock} />,
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('triggers onSubmit when submit button is clicked', async () => {
    const onSubmitMock = jest.fn();
    const request = {
      word: 'new word',
      synonyms: {
        toAdd: [wordsList[0]],
        toRemove: [],
      },
    };

    renderWithRootProvider(
      <AddSynonymsModal isOpen={true} onSubmit={onSubmitMock} />,
    );

    const wordInput = screen.getByPlaceholderText('Enter word');
    fireEvent.change(wordInput, { target: { value: request.word } }); // writing a word

    const synonymsMultiSelect = screen.getByPlaceholderText('Enter synonym');
    fireEvent.focusIn(synonymsMultiSelect); // opening the multiselect dropdown

    let multiselectOption;
    // waiting for the options to load
    await waitFor(() => {
      multiselectOption = screen.getByText(request.synonyms.toAdd[0]);
      expect(multiselectOption).toBeInTheDocument();
    });

    fireEvent.click(multiselectOption);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalledWith(request);
  });

  it('triggers required validation errors when submitting without any data', async () => {
    const onSubmitMock = jest.fn();

    renderWithRootProvider(
      <AddSynonymsModal isOpen={true} onSubmit={onSubmitMock} />,
    );

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(onSubmitMock).not.toHaveBeenCalled();

    expect(screen.getByText('Synonyms are required')).toBeInTheDocument();
    expect(screen.getByText('Word is required')).toBeInTheDocument();
  });
});
