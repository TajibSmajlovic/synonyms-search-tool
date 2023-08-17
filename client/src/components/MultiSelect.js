import styled from 'styled-components';
import { useState } from 'react';

import { Input as DefaultInput } from 'components';
import { CloseIcon } from 'assets/Icons';
import { generateId } from 'utils/helpers';
import { MULTI_SELECT_CATEGORIES } from 'utils/constants';

const SCROLL_THRESHOLD = 50;

const generateItem = (value) => ({
  id: generateId(),
  value,
  label: value,
});

export const MultiSelect = ({
  inputValue,
  error,
  options,
  selectedItems,
  preselectedItems,
  onInputChange,
  onInputFocus,
  onInputBlur,
  handleScroll,
  handleItemSelect,
  handleItemRemove,
  placeholder = 'Enter a value',
  isDisabled = false,
  PreselectedValueComponent = Selected,
  SelectedValueComponent = Selected,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onFocus = (event) => {
    setIsOpen(true);
    onInputFocus?.(event);
  };

  const onBlur = (event) => {
    // a small delay is needed to prevent the dropdown from closing before the item is selected
    setTimeout(() => {
      setIsOpen(false);
    }, 80);

    onInputBlur?.(event);
  };

  return (
    <StyledMultiSelect>
      <Input
        isDisabled={isDisabled}
        error={error}
        value={inputValue}
        onChange={onInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        $isDropdownOpen={isOpen}
      />
      <SelectedValues>
        {preselectedItems.map((item) => (
          <PreselectedValueComponent
            key={item.id}
            item={item}
            handleItemRemove={() =>
              handleItemRemove(item, MULTI_SELECT_CATEGORIES.PRESELECTED)
            }
          />
        ))}
        {selectedItems.map((item) => (
          <SelectedValueComponent
            key={item.id}
            style={{
              backgroundColor: 'var(--primary-light)',
              borderColor: 'var(--primary-darker)',
            }}
            item={item}
            handleItemRemove={handleItemRemove}
          />
        ))}
      </SelectedValues>
      <Dropdown
        isOpen={isOpen}
        options={options}
        handleScroll={handleScroll}
        handleSelect={handleItemSelect}
        inputValue={inputValue}
      />
    </StyledMultiSelect>
  );
};

export const Selected = ({ item, handleItemRemove, ...rest }) => (
  <SelectedValue {...rest}>
    <span>{item.value}</span>
    <div onClick={() => handleItemRemove(item)}>
      <CloseIcon height={10} width={10} />
    </div>
  </SelectedValue>
);

const Dropdown = ({
  isOpen,
  options,
  inputValue,
  handleSelect,
  handleScroll,
}) => {
  if (!isOpen) return null;
  if (!Boolean(options.length) && !Boolean(inputValue)) return null;

  if (!Boolean(options.length) && Boolean(inputValue))
    return (
      <StyledDropdown>
        <AddOption onClick={() => handleSelect(generateItem(inputValue))}>
          Add <b>{inputValue}</b>
        </AddOption>
      </StyledDropdown>
    );

  const onScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    const shouldTryToLoad =
      scrollHeight - scrollTop - SCROLL_THRESHOLD < clientHeight;

    if (shouldTryToLoad) {
      handleScroll?.();
    }
  };

  return (
    <StyledDropdown onScroll={onScroll}>
      {options.map((option) => (
        <Option key={option.id} onClick={() => handleSelect(option)}>
          {option.value}
        </Option>
      ))}
    </StyledDropdown>
  );
};

//#region Styles
const StyledMultiSelect = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
`;

const Input = styled(DefaultInput)`
  padding: 0.675rem;
  width: 100%;
  outline: none;
  box-shadow: none;

  ${({ $isDropdownOpen }) =>
    $isDropdownOpen &&
    `
      border-bottom-right-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    `}

  &:focus {
    border-color: var(--gray_300);
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const SelectedValues = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 5px;
  user-select: none;

  &:has(> div) {
    margin-top: 0.5rem;
    padding-inline: 0.3rem;
  }
`;

const SelectedValue = styled.div`
  width: 100%;
  background-color: var(--gray_100);
  border: 1px solid var(--gray_300);
  padding: 0.375rem 0.625rem;
  font-size: 0.725rem;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  cursor: default;

  span {
    display: inline-block;
    width: 80%;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  div {
    cursor: pointer;
  }
`;

const StyledDropdown = styled.ul`
  max-height: 227px;
  overflow-y: auto;
  position: absolute;
  top: 41px;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid var(--gray_300);
  list-style: none;
  padding: 0.675rem 0;
  margin: 0;
  z-index: 10;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
`;

const Option = styled.li`
  --block-gap: 0.675rem;
  padding: var(--block-gap);
  cursor: pointer;

  &:has(b) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    gap: 0.6rem;

    b {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &:hover {
    background-color: var(--gray_100);
  }

  &:first-of-type {
    margin-top: calc(-1 * var(--block-gap));
  }

  &:last-of-type {
    margin-bottom: calc(-1 * var(--block-gap));
  }
`;

const AddOption = styled(Option)`
  padding: 0.675rem !important;
  margin: -0.675rem 0 !important;
`;
//#endregion Styles
