export const generateId = () => `id_${new Date().getTime()}_${Math.random()}`;

export function buildQueryPath(path, params) {
  let queryParams = '';

  Object.entries(params).forEach(([key, value]) => {
    if (Boolean(queryParams)) {
      queryParams += '&';
    }

    queryParams += `${key}=${value}`;
  });

  return `${path}?${queryParams}`;
}

function flatSynonymsTreeToDirectChildrenRecursively(
  synonymsTree,
  flattened = [],
) {
  for (const key in synonymsTree) {
    flattened.push(key);

    if (
      typeof synonymsTree[key] === 'object' &&
      Object.keys(synonymsTree[key]).length > 0
    ) {
      flatSynonymsTreeToDirectChildrenRecursively(synonymsTree[key], flattened);
    }
  }

  return flattened;
}

/*
 iterate over synonyms tree and for each direct child populate a list containing its synonyms
  ex:
      {
        ecstatic: {},                           {
        joyful: {},                               ecstatic: [],
        raif: {                   --->            joyful: [],
          rojf: {},                               raif: ['rojf, 'smajke']
          smajke: {},                           }
        },
      };
*/

export function flatSynonymsTreeToDirectChildren(tree) {
  const flattened = {};

  for (const key in tree) {
    flattened[key] = flatSynonymsTreeToDirectChildrenRecursively(tree[key]);
  }

  return flattened;
}

/*
  map flattened tree to list of objects
  ex:
      {                                     [
        ecstatic: []                          {word: 'joyful', synonyms: []},
        joyful: []                 --->       {word: 'ecstatic', synonyms: []},
        raif: ['rojf, 'smajke']               {word: 'raif', synonyms: ['rojf, smajke']}
      }                                     ]
*/
export function mapFlattenedSynonymsTreeToListOfObject(flattenedSynonymsTree) {
  return Object.keys(flattenedSynonymsTree).map((word) => ({
    word,
    synonyms: flattenedSynonymsTree[word],
  }));
}

/*
  map list of objects to one list
  ex:
     [
        {word: 'joyful', synonyms: []},
        {word: 'ecstatic', synonyms: []},                ['joyful', 'ecstatic', 'raif', 'rojf, smajke']
        {word: 'raif', synonyms: ['rojf, smajke']}
     ]
*/
export function mapSynonymsTreeListOfObjectsToOneList(
  synonymsListOfObjects,
  wordKey = 'word',
  synonymsKey = 'synonyms',
) {
  return synonymsListOfObjects
    .map((item) => {
      const directSynonym = item[wordKey];
      const transientSynonyms = item[synonymsKey] || [];

      return [directSynonym, ...transientSynonyms];
    })
    .flat()
    .flat();
}
