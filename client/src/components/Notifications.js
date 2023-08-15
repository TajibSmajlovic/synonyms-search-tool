import styled, { keyframes } from 'styled-components';

import { Alert, If } from 'components';
import { useRootContext } from 'context';
import { SCREEN_BREAKPOINTS } from 'utils/constants';

export const Notifications = () => {
  const { notifications, clearNotification } = useRootContext();

  return (
    <If predicate={Boolean(notifications.length)}>
      <Wrapper>
        {notifications.map((notification) => (
          <Animated key={notification.id}>
            <Alert
              variant={notification.variant}
              onClose={() => clearNotification(notification.id)}
            >
              {notification.message}
            </Alert>
          </Animated>
        ))}
      </Wrapper>
    </If>
  );
};

//#region Styles
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  z-index: 999999;
  box-sizing: border-box;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 1rem;
  min-width: 20%;
  font-size: 0.9rem;

  @media screen and (width >= ${SCREEN_BREAKPOINTS.TABLET}px) {
    width: unset;
    bottom: 0px;
    top: unset;
  }
`;

const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Animated = styled.div`
  animation: ${slideIn} 0.3s ease-in-out;
  animation-fill-mode: forwards;
  animation-duration: 0.4s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-play-state: running;
`;
//#endregion Styles
