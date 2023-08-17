import styled from 'styled-components';

import { If } from './If';
import { Spinner } from './Spinner';

export const Button = ({ type = 'primary', children, ...props } = {}) => {
  switch (type) {
    case 'submit':
      return <SubmitButton {...props}>{children}</SubmitButton>;
    case 'outline':
      return <OutlineButton {...props}>{children}</OutlineButton>;
    default: // defaulting to primary
      return <PrimaryButton {...props}>{children}</PrimaryButton>;
  }
};

//#region Styles
const Base = styled.button`
  width: 100%;
  background-color: var(--button-background-color);
  color: var(--button-color);
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:enabled() {
    background-color: var(--button-hover-background-color);
  }

  &:focus:enabled {
    outline: none;
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Base)`
  --button-background-color: var(--primary);
  --button-color: var(--white);
  --button-hover-background-color: var(--primary-darker);
`;

const OutlineButton = styled(Base)`
  --button-background-color: var(--white);
  border: 1px solid var(--gray_200);
  --button-hover-background-color: var(--gray_200);
`;

const SubmitButton = styled(({ isLoading, onClick, children, ...rest }) => (
  <PrimaryButton type="submit" disabled={isLoading} onClick={onClick} {...rest}>
    <If predicate={isLoading}>
      <Spinner width={16} height={16} color="var(--white)" />
    </If>
    {children}
  </PrimaryButton>
))`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
//#endregion Styles
