const { word } = require('@models/dtos');

describe('word.dto', () => {
  it('should map word and synonyms to DTO format', () => {
    const synonyms = new Set(['synonym1', 'synonym2']);
    const result = word.mapToDto('example', synonyms);

    expect(result).toEqual({
      word: 'example',
      synonyms: ['synonym1', 'synonym2'],
    });
  });

  it('should map synonyms set to DTO format', () => {
    const synonyms = new Set(['synonym1', 'synonym2']);
    const result = word.mapToSynonymsDto(synonyms);

    expect(result).toEqual(['synonym1', 'synonym2']);
  });

  it('should map word and synonyms to tree DTO format', () => {
    const synonyms = {
      synonym1: {},
      synonym2: {},
    };

    const result = word.mapToTreeDto('example', synonyms);

    expect(result).toEqual({
      word: 'example',
      tree: {
        synonym1: {},
        synonym2: {},
      },
    });
  });
});
