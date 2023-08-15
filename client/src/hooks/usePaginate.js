import { useCallback, useState } from 'react';

export const usePaginate = (initialPage = 1, initialPageSize = 10) => {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handlePageChange = useCallback((page) => {
    if (Boolean(page)) {
      setPage(page);
    } else {
      setPage((prevState) => prevState + 1);
    }
  }, []);

  const handlePageSizeChange = useCallback((size) => {
    setPageSize(size);
  }, []);

  return {
    page,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
  };
};
