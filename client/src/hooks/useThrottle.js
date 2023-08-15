import { useEffect, useRef, useState } from 'react';

import { THROTTLE_INTERVAL } from 'utils/constants';

export function useThrottle(value, interval = THROTTLE_INTERVAL) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdated = useRef();

  useEffect(() => {
    const now = Date.now();

    if (now >= lastUpdated.current + interval) {
      lastUpdated.current = now;

      setThrottledValue(value);
    } else {
      const id = window.setTimeout(() => {
        lastUpdated.current = now;
        setThrottledValue(value);
      }, interval);

      return () => window.clearTimeout(id);
    }
  }, [value, interval]);

  return throttledValue;
}
