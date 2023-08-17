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

// recursively iterate over synonyms tree and populate array with all synonyms found
function flatSynonymsTreeRecursively(synonymsTree, flattened = []) {
  for (const key in synonymsTree) {
    flattened.push(key);

    if (
      typeof synonymsTree[key] === 'object' &&
      Object.keys(synonymsTree[key]).length > 0
    ) {
      flatSynonymsTreeRecursively(synonymsTree[key], flattened);
    }
  }

  return flattened;
}

// iterate over direct synonyms (children) and create a string contain all connected (transient) synonyms
export function flatSynonymsTree(tree) {
  const flattened = {};

  for (const key in tree) {
    flattened[key] = flatSynonymsTreeRecursively(tree[key]);
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
export const mapFlattenedSynonymsTreeToList = (flattenedSynonymsTree) =>
  Object.keys(flattenedSynonymsTree).map((word) => ({
    word,
    synonyms: flattenedSynonymsTree[word],
  }));
