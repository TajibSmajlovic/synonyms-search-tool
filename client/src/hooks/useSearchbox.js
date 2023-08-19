import { useCallback, useState } from 'react';

import { useDebounce } from 'hooks';

export const useSearchbox = (initialValue = '') => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const { debouncedValue, setDebouncedValue } = useDebounce(searchTerm);

  const onChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const onSearch = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData(e.target.form);
      const searchValue = formData.get('search');

      setDebouncedValue(searchValue);
    },
    [setDebouncedValue],
  );

  const setSearchValue = useCallback(
    (value) => {
      setSearchTerm(value);
      setDebouncedValue(value);
    },
    [setDebouncedValue],
  );

  const onClear = useCallback(() => {
    setDebouncedValue('');
    setSearchTerm('');
  }, [setDebouncedValue]);

  return {
    debouncedValue,
    searchTerm,
    onChange,
    onSearch,
    setSearchValue,
    onClear,
  };
};
