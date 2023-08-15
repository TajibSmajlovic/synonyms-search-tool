export const generateId = () => `id_${new Date().getTime()}`;

export const buildQueryPath = (path, params) => {
  let queryParams = '';

  Object.entries(params).forEach(([key, value]) => {
    if (Boolean(queryParams)) {
      queryParams += '&';
    }

    queryParams += `${key}=${value}`;
  });

  return `${path}?${queryParams}`;
};
