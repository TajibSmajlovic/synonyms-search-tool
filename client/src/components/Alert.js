import styled from 'styled-components';

import { CloseIcon } from 'assets/Icons';
import { If } from 'components';
import { ALERT_VARIANTS, SCREEN_BREAKPOINTS } from 'utils/constants';

export const Alert = ({ variant, onClose, children }) => {
  let Component;

  switch (variant) {
    case ALERT_VARIANTS.SUCCESS:
      Component = SuccessAlert;
      break;
    case ALERT_VARIANTS.INFO:
      Component = InfoAlert;
      break;
    case ALERT_VARIANTS.WARNING:
      Component = WarningAlert;
      break;
    case ALERT_VARIANTS.ERROR:
      Component = ErrorAlert;
      break;
    default:
      Component = StyledAlert;
  }

  return (
    <Component>
      {children}
      <If predicate={onClose}>
        <Close onClick={onClose}>
          <CloseIcon height={10} width={10} stroke={`var(--${variant})`} />
        </Close>
      </If>
    </Component>
  );
};

//#region Styles
const StyledAlert = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  font-size: 0.8rem;

  @media screen and (width >= ${SCREEN_BREAKPOINTS.TABLET}px) {
    font-size: 1rem;
  }
`;

const SuccessAlert = styled(StyledAlert)`
  background-color: var(--success-background);
  color: var(--success);
  border-color: var(--success-border);
`;

const InfoAlert = styled(StyledAlert)`
  background-color: var(--info-background);
  color: var(--info);
  border-color: var(--info-border);
`;

const WarningAlert = styled(StyledAlert)`
  background-color: var(--warning-background);
  color: var(--warning);
  border-color: var(--warning-border);
`;

const ErrorAlert = styled(StyledAlert)`
  background-color: var(--error-background);
  color: var(--error);
  border-color: var(--error-border);
`;

const Close = styled.span`
  position: relative;
  float: right;
  padding-left: 0.5rem;
  top: -10px;
  right: -12px;
  cursor: pointer;
  padding: 0.2rem;
`;
//#endregion Styles
