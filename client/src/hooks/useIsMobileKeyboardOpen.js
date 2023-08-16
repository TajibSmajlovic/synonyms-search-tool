import { useState, useEffect } from 'react';

export const useIsMobileKeyboardOpen = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const { innerHeight: height } = window;

      setIsKeyboardOpen(height < 500);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isKeyboardOpen;
};
