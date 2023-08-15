import { useState, useEffect } from 'react';

import { SPIN_DELAY } from 'utils/constants';

// Used for enhancing user experience by making sure there is no flickers caused by fast loading
export const useSpinDelay = (isLoading, delay = SPIN_DELAY) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowSpinner(true);

      setTimeout(() => {
        setShowSpinner(false);
      }, delay);
    }
  }, [isLoading, delay]);

  return showSpinner;
};
