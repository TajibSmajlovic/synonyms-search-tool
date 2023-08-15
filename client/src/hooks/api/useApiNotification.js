import { useEffect } from 'react';

import { useRootContext } from 'context/RootContext';
import { ALERT_VARIANTS } from 'utils/constants';

export const useApiNotification = ({
  result,
  successMessage,
  errorMessage,
}) => {
  const { showNotification } = useRootContext();

  useEffect(() => {
    if (errorMessage) {
      showNotification(errorMessage, ALERT_VARIANTS.ERROR);
    }
  }, [errorMessage, showNotification]);

  useEffect(() => {
    if (result) {
      showNotification(successMessage);
    }
  }, [result, showNotification, successMessage]);
};
