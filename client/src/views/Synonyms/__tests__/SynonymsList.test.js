import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import SynonymsList from '../SynonymsList';
import { synonymsList } from 'utils/tests/mockedData';

const word = 'test';
const mockOpenModal = jest.fn();

describe('SynonymsList', () => {
  it('renders loading message when isLoading is true', () => {
    render(<SynonymsList isLoading={true} word={word} />);

    const loadingMessage = screen.getByText(/Searching for synonyms of/i);
    const searchedWord = screen.getByText(word);

    expect(loadingMessage).toBeInTheDocument();
    expect(searchedWord).toBeInTheDocument();
  });

  it('renders "no synonyms" message when no synonyms are provided', () => {
    render(
      <SynonymsList synonyms={[]} word={word} openModal={mockOpenModal} />,
    );

    const noSynonymsMessage = screen.getByText(/No synonyms found found for/i);
    const searchedWord = screen.getByText(word);
    expect(noSynonymsMessage).toBeInTheDocument();
    expect(searchedWord).toBeInTheDocument();

    const addSynonymLink = screen.getByTestId('toggle-add-synonym-modal');
    expect(addSynonymLink).toBeInTheDocument();

    userEvent.click(addSynonymLink);
    expect(mockOpenModal).toHaveBeenCalledTimes(1);
  });

  it('renders synonyms when they are provided', () => {
    render(<SynonymsList synonyms={synonymsList} word={word} />);

    synonymsList.forEach((synonym) => {
      const synonymElement = screen.getByText(synonym);
      expect(synonymElement).toBeInTheDocument();
    });
  });
});
