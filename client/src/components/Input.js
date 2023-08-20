import styled from 'styled-components';

import { If, Spinner as DefaultSpinner } from 'components';

export const Input = ({
  value,
  onChange,
  error,
  isDisabled,
  showSpinner,
  placeholder = 'Enter word',
  ...rest
}) => (
  <InputWrapper>
    <StyledInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      $hasError={Boolean(error)}
      disabled={isDisabled}
      {...rest}
    />
    <If predicate={showSpinner}>
      <Spinner />
    </If>
    <If predicate={Boolean(error)}>
      <Error>{error}</Error>
    </If>
  </InputWrapper>
);

//#region Styles
const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.675rem;
  border: 1px solid var(--gray_300);
  color: var(--gray_700);
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: var(--info);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  ${({ $hasError }) =>
    $hasError &&
    `
        border-color: var(--error) !important;
        color: var(--error) !important;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    `}
`;

const Error = styled.div`
  color: var(--error);
  font-size: 0.7rem;
  margin-top: 4px;
`;

const Spinner = styled(({ ...rest }) => (
  <div {...rest}>
    <DefaultSpinner height={12} width={12} />
  </div>
))`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;
//#endregion
