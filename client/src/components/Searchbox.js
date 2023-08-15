import styled from 'styled-components';

import { CloseIcon } from 'assets';
import { If, Spinner } from 'components';
import { SCREEN_BREAKPOINTS } from 'utils/constants';

export const Searchbox = ({
  searchTerm,
  isSearching,
  onChange,
  onSearch,
  onClear,
}) => (
  <StyledSearchbox>
    <SearchInput
      type="text"
      name="search"
      placeholder="Type to search for synonyms"
      value={searchTerm}
      onChange={onChange}
    />
    <If predicate={isSearching}>
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    </If>
    <If predicate={searchTerm}>
      <Close onClick={onClear} />
    </If>
    <button type="submit" hidden onClick={onSearch}>
      Search
    </button>
  </StyledSearchbox>
);

//#region Styles
const StyledSearchbox = styled.form`
  position: relative;
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--white);
`;

const SearchInput = styled.input`
  height: 100%;
  width: 100%;
  font-size: 1.2rem;
  border: none;
  outline: 0;
  padding: 1rem 2rem;
  color: var(--gray_700);
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;

  &:focus {
    box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.1);
  }

  @media screen and (width >= ${SCREEN_BREAKPOINTS.LAPTOP}px) {
    font-size: 1.8rem;
  }
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  right: 0;
  transform: translateX(-15%);
`;

const Close = styled(({ onClick, ...rest }) => (
  <div onClick={onClick} {...rest} tabIndex="0">
    <CloseIcon height={25} width={25} />
  </div>
))`
  position: absolute;
  top: 22px;
  right: 20px;
  height: 25px;
  width: 25px;
  cursor: pointer;
`;
//#endregion Styles
