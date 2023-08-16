const seedWordsStore = () => {
  const store = new Map();

  store.set('happy', new Set(['glad', 'joyful', 'ecstatic']));
  store.set('glad', new Set(['happy']));
  store.set('joyful', new Set(['happy']));
  store.set('ecstatic', new Set(['happy']));
  store.set('sad', new Set(['unhappy', 'depressed']));
  store.set('unhappy', new Set(['sad']));
  store.set('depressed', new Set(['sad']));
  store.set('angry', new Set(['mad', 'furious', 'enraged']));
  store.set('mad', new Set(['angry']));
  store.set('furious', new Set(['angry']));
  store.set('enraged', new Set(['angry']));
  store.set('scared', new Set(['frightened', 'afraid', 'terrified']));
  store.set('frightened', new Set(['scared']));
  store.set('afraid', new Set(['scared']));
  store.set('terrified', new Set(['scared']));

  return store;
};

module.exports = {
  seedWordsStore,
};
