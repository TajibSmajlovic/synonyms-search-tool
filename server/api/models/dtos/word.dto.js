const mapToSynonymsDto = (synonyms) => ({
  synonyms: Array.from(synonyms.values()),
});

const mapToDto = (word, synonyms) => ({
  word,
  synonyms: mapToSynonymsDto(synonyms),
});

module.exports = {
  mapToDto,
  mapToSynonymsDto,
};
