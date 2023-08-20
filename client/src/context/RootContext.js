import {
  useMemo,
  useContext,
  useCallback,
  createContext,
  useState,
} from 'react';

import { generateId } from 'utils/helpers';
import { ALERT_VARIANTS, NOTIFICATION_DISMISS_TIMEOUT } from 'utils/constants';

const RootContext = createContext();

// Context responsible for storing global state like user, notifications, etc.
export const RootProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const clearNotification = useCallback((notificationId) => {
    setNotifications((prevState) => {
      const index = prevState.findIndex(
        (notification) => notification.id === notificationId,
      );
      const notification = prevState[index];

      clearInterval(notification.timeout);

      return prevState.filter(
        (notification) => notification.id !== notificationId,
      );
    });
  }, []);

  const showNotification = useCallback(
    (
      message,
      variant = ALERT_VARIANTS.SUCCESS,
      duration = NOTIFICATION_DISMISS_TIMEOUT,
    ) => {
      const id = generateId();

      // create timeout object for deleting notification when expires
      const timeout = setTimeout(() => {
        clearNotification(id);
      }, duration);

      setNotifications((prevState) => [
        ...prevState,
        { id, message, variant, timeout },
      ]);
    },
    [clearNotification],
  );

  const context = useMemo(
    () => ({
      notifications,
      showNotification,
      clearNotification,
    }),
    [notifications, showNotification, clearNotification],
  );

  return (
    <RootContext.Provider value={context}>{children}</RootContext.Provider>
  );
};

export function useRootContext() {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error('useRootContext must be used within a RootContextProvider');
  }
  return context;
}
