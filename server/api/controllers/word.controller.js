const { wordService } = require('@services');
const { withErrorBoundary } = require('@utils/errors');
const { HTTP_STATUSES } = require('@constants');

const getWords = (req, res) => {
  const response = wordService.getWords(req.query);

  res.status(HTTP_STATUSES.OK).json(response);
};

const getSynonyms = async (req, res) => {
  const { word } = req.query;

  const response = wordService.getSynonyms(word);

  res.status(HTTP_STATUSES.OK).json(response);
};

const getSynonymsTree = async (req, res) => {
  const { word } = req.query;

  const response = wordService.getSynonymsTree(word);

  res.status(HTTP_STATUSES.OK).json(response);
};

const addSynonyms = (req, res) => {
  const { word, synonyms } = req.body;

  const response = wordService.addSynonyms(word, synonyms);

  res.status(HTTP_STATUSES.CREATED).json(response);
};

module.exports = {
  getWords: withErrorBoundary(getWords),
  getSynonyms: withErrorBoundary(getSynonyms),
  getSynonymsTree: withErrorBoundary(getSynonymsTree),
  addSynonyms: withErrorBoundary(addSynonyms),
};
