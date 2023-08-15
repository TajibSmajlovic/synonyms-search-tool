import { useState, useEffect } from 'react';

import { DEBOUNCE_TIMEOUT } from 'utils/constants';

export const useDebounce = (value, delay = DEBOUNCE_TIMEOUT) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue, setDebouncedValue };
};
