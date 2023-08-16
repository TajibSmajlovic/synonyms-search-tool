const { seedWordsStore } = require('./seed');

// graph data structure to store words and their synonyms
class WordsStore {
  #store; // key: word, value: set of synonyms

  constructor() {
    this.#store = seedWordsStore();
    this.helper = this.#store;
  }

  get all() {
    return this.#store;
  }

  get words() {
    return Array.from(this.#store.keys());
  }

  get wordsCount() {
    return this.#store.size;
  }

  hasWord(word) {
    return this.#store.has(word);
  }

  hasSynonym(word, synonym) {
    return this.getSynonyms(word).has(synonym);
  }

  getSynonyms(word) {
    return this.#store.get(word);
  }

  addWord(word) {
    this.#store.set(word, new Set());
  }

  addSynonym(word, synonym) {
    this.#store.get(word).add(synonym);
    this.#store.get(synonym).add(word);
  }

  removeSynonym(word, synonym) {
    this.#store.get(word).delete(synonym);
    this.#store.get(synonym).delete(word);
  }
}

module.exports = new WordsStore();
