function paginateData(pageNumber, pageSize, data) {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = data.slice(startIndex, endIndex);

  return paginatedItems;
}

module.exports = {
  paginateData,
};
