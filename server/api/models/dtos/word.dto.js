const mapToSynonymsDto = (synonyms) => Array.from(synonyms.values());

const mapToDto = (word, synonyms) => ({
  word,
  synonyms: mapToSynonymsDto(synonyms),
});

const mapToTreeDto = (word, synonyms) => ({
  word,
  tree: synonyms,
});

module.exports = {
  mapToDto,
  mapToSynonymsDto,
  mapToTreeDto,
};
