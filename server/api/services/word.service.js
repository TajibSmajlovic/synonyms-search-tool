const { wordsStore } = require('@infrastructure');
const { pagination } = require('@utils');
const { ApiError } = require('@utils/errors');
const { word: wordDto, response } = require('@models/dtos');
const { HTTP_STATUSES } = require('@constants');

// #region Helper functions
function getAllSynonymsRecursively(word, foundSynonyms, seenWords) {
  if (seenWords.has(word)) return foundSynonyms;

  const synonyms = wordsStore.getSynonyms(word);

  seenWords.set(word, true); // kept track of seen words to prevent infinite loop

  if (!synonyms) return foundSynonyms;

  for (const synonym of synonyms) {
    foundSynonyms.add(synonym);
    getAllSynonymsRecursively(synonym, foundSynonyms, seenWords);
  }

  return foundSynonyms;
}

function getAllSynonyms(word) {
  // word not found which means it's not possible to have synonyms
  if (!wordsStore.hasWord(word)) return [];
  if (wordsStore.wordsCount === 0) return [];

  const seenWords = new Map();
  const foundSynonyms = new Set();

  getAllSynonymsRecursively(word, foundSynonyms, seenWords);

  // remove the word itself from the synonyms
  foundSynonyms.delete(word);

  return Array.from(foundSynonyms);
}

function checkForRelationship(word, synonym) {
  const doestAlreadyExist = getAllSynonyms(word).includes(synonym);

  if (doestAlreadyExist) {
    throw new ApiError(
      HTTP_STATUSES.BAD_REQUEST,
      `Synonym relationship between ${word} and ${synonym} already exists!`,
    );
  }
}

function buildSynonymsTreeRecursively(word, visited = new Set()) {
  if (!wordsStore.hasWord(word) || visited.has(word)) {
    return {};
  }

  visited.add(word);

  const synonyms = wordsStore.getSynonyms(word);
  const tree = new Map();

  for (const synonym of synonyms) {
    if (!visited.has(synonym)) {
      tree.set(synonym, buildSynonymsTreeRecursively(synonym, visited));
    }
  }

  return Object.fromEntries(tree);
}
// #endregion Helper functions

function getSynonymsTree(word) {
  // word not found which means it's not possible to have synonyms
  if (!wordsStore.hasWord(word)) return new Map();

  const synonymsTree = buildSynonymsTreeRecursively(word);
  const treeDto = wordDto.mapToTreeDto(word, synonymsTree);

  return response.generate(treeDto);
}

const getWords = ({ keyword = '', page = 1, pageSize = 10 } = {}) => {
  const allWords = wordsStore.words;
  const total = wordsStore.wordsCount;

  let words = allWords;

  if (keyword) {
    words = words.filter((word) => word.startsWith(keyword));
  }

  words = pagination.paginateData(page, pageSize, words);

  return response.generate({ words, total });
};

const getSynonyms = (word) => {
  const synonymsEntities = getAllSynonyms(word);
  const synonymsDto = wordDto.mapToSynonymsDto(synonymsEntities);

  return response.generate(synonymsDto);
};

const addSynonyms = (word, synonyms) => {
  const wordExists = wordsStore.hasWord(word);

  const { toAdd, toRemove } = synonyms;

  if (toAdd.includes(word)) {
    throw new ApiError(
      HTTP_STATUSES.BAD_REQUEST,
      'Word cannot be synonym of itself!',
    );
  }

  // only add word if it's not already added
  if (!wordExists) {
    wordsStore.addWord(word);
  }

  toRemove.forEach((synonym) => {
    wordsStore.removeSynonym(word, synonym);
  });

  toAdd.forEach((synonym) => {
    const synonymWordExists = wordsStore.hasWord(synonym);

    // only add word if it's not already added
    if (!synonymWordExists) {
      wordsStore.addWord(synonym);
    }

    // only create synonym relationship if it's not already created
    if (!wordsStore.hasSynonym(word, synonym)) {
      checkForRelationship(word, synonym);
      wordsStore.addSynonym(word, synonym);
    }
  });

  return response.generate(
    null,
    `Synonyms relationships for the word:'${word}' updated!`,
  );
};

module.exports = {
  getWords,
  getSynonyms,
  getSynonymsTree,
  addSynonyms,
};
