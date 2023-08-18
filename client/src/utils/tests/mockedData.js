export const synonymsList = [
  'similar',
  'equivalent',
  'alike',
  'comparable',
  'like',
];
export const wordsList = [
  'rojf',
  'test',
  'harla',
  'krla',
  'happy',
  ...synonymsList,
];

export const synonymsTree = {
  word: 'test',
  tree: {
    rojf: {},
    harla: {
      happy: {
        glad: {},
        joyful: {},
        ecstatic: {},
      },
    },
    krla: {
      mad: {
        angry: {
          furious: {},
          enraged: {},
        },
      },
    },
  },
};

export const addSynonymsBody = {
  word: 'test',
  synonyms: {
    toAdd: ['test1', 'test2'],
    toRemove: ['test3', 'test4'],
  },
};
