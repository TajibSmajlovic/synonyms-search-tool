const request = require('supertest');

const app = require('@root/api/app');
const { response: responseDto, word: wordDto } = require('@models/dtos');
const { pagination } = require('@utils');
const { HTTP_STATUSES } = require('@constants');

const wordsStore = require('../utils/setupWordsStore');
const {
  happyWordSynonyms: happyWordSynonymsMocked,
  happyWordSynonymsTree: happyWordSynonymsTreeMocked,
} = require('../utils/mockedData');

describe('Word routes', () => {
  describe('GET /words', () => {
    it('should return proper response with default page and pageSize', async () => {
      // default page and pageSize
      const page = 1;
      const pageSize = 10;

      const response = await request(app).get('/api/words');

      const expectedResponse = responseDto.generate({
        words: pagination.paginateData(page, pageSize, wordsStore.words),
        total: wordsStore.wordsCount,
      });

      expect(response.statusCode).toBe(HTTP_STATUSES.OK);
      expect(response.body).toEqual(expectedResponse);
    });

    it('should return proper response with custom page and pageSize', async () => {
      const page = 1;
      const pageSize = 5;

      const response = await request(app)
        .get('/api/words')
        .query({ page, pageSize });

      const expectedResponse = responseDto.generate({
        words: pagination.paginateData(page, pageSize, wordsStore.words),
        total: wordsStore.wordsCount,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });

    it('should return proper response with custom keyword', async () => {
      const keyword = 'test';

      const response = await request(app).get('/api/words').query({ keyword });

      const expectedResponse = responseDto.generate({
        words: wordsStore.words.filter((word) => word.startsWith(keyword)),
        total: wordsStore.wordsCount,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });

    it('should return proper response with custom keyword, page and pageSize', async () => {
      const keyword = 'test';
      const page = 1;
      const pageSize = 5;

      const response = await request(app)
        .get('/api/words')
        .query({ keyword, page, pageSize });

      const expectedResponse = responseDto.generate({
        words: wordsStore.words.filter((word) => word.startsWith(keyword)),
        total: wordsStore.wordsCount,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
  });

  describe('GET /words/synonyms', () => {
    it('should return proper response containing all synonyms for a given word', async () => {
      const word = 'happy';

      const response = await request(app)
        .get('/api/words/synonyms')
        .query({ word });

      const expectedResponse = responseDto.generate(happyWordSynonymsMocked);

      expect(response.statusCode).toBe(HTTP_STATUSES.OK);
      expect(response.body).toEqual(expectedResponse);
    });

    it('should return proper response for a word with no synonyms', async () => {
      const word = 'test';

      const response = await request(app)
        .get('/api/words/synonyms')
        .query({ word });

      const expectedResponse = responseDto.generate([]);

      expect(response.statusCode).toBe(HTTP_STATUSES.OK);
      expect(response.body).toEqual(expectedResponse);
    });
  });

  describe('GET /words/synonyms-tree', () => {
    it('should return proper response for a word containing all synonyms tree', async () => {
      const word = 'happy';

      const response = await request(app)
        .get('/api/words/synonyms-tree')
        .query({ word });

      const expectedResponse = responseDto.generate(
        wordDto.mapToTreeDto(word, happyWordSynonymsTreeMocked),
      );

      expect(response.statusCode).toBe(HTTP_STATUSES.OK);
      expect(response.body).toEqual(expectedResponse);
    });
  });

  describe('POST /words/synonyms', () => {
    it('should return proper response for a word containing all synonyms tree', async () => {
      const word = 'new';
      const synonymsToAdd = ['new1', 'new2'];

      const response = await request(app)
        .post('/api/words/synonyms')
        .send({
          word,
          synonyms: {
            toAdd: synonymsToAdd,
            toRemove: [],
          },
        });

      const expectedResponse = responseDto.generate(
        null,
        `Synonyms relationships for the word:'${word}' updated!`,
      );

      // verifying data is inserted
      expect(wordsStore.hasWord(word)).toBe(true);
      synonymsToAdd.forEach((synonym) => {
        expect(wordsStore.hasWord(synonym)).toBe(true);
      });

      expect(response.statusCode).toBe(HTTP_STATUSES.CREATED);
      expect(response.body).toEqual(expectedResponse);
    });

    it('should return Bad Request error for a synonym relation that already exists', async () => {
      const word = 'raif';
      const synonymsToAdd = ['rojf', 'smajke'];

      const response = await request(app)
        .post('/api/words/synonyms')
        .send({
          word,
          synonyms: {
            toAdd: synonymsToAdd,
            toRemove: [],
          },
        });

      const expectedResponse = responseDto.generate(
        null,
        `Synonyms relationships for the word:'${word}' updated!`,
      );

      expect(response.statusCode).toBe(HTTP_STATUSES.CREATED);
      expect(response.body).toEqual(expectedResponse);

      const word2 = 'smajke';
      const synonymsToAdd2 = ['rojf'];

      const response2 = await request(app)
        .post('/api/words/synonyms')
        .send({
          word: word2,
          synonyms: {
            toAdd: synonymsToAdd2,
            toRemove: [],
          },
        });

      const expectedResponse2 = responseDto.generate(
        null,
        `Synonym relationship between ${word2} and ${synonymsToAdd2[0]} already exists!`,
      );

      expect(response2.statusCode).toBe(HTTP_STATUSES.BAD_REQUEST);
      expect(response2.body).toEqual(expectedResponse2);
    });

    it('should remove synonyms for a given word', async () => {
      const word = 'raif';
      const synonymsToAdd = ['rojf', 'smajke'];

      const response = await request(app)
        .post('/api/words/synonyms')
        .send({
          word,
          synonyms: {
            toAdd: synonymsToAdd,
            toRemove: [],
          },
        });

      const expectedResponse = responseDto.generate(
        null,
        `Synonyms relationships for the word:'${word}' updated!`,
      );

      expect(response.statusCode).toBe(HTTP_STATUSES.CREATED);
      expect(response.body).toEqual(expectedResponse);

      const synonymsToRemove = synonymsToAdd;

      const response2 = await request(app)
        .post('/api/words/synonyms')
        .send({
          word,
          synonyms: {
            toAdd: [],
            toRemove: synonymsToRemove,
          },
        });

      const expectedResponse2 = responseDto.generate(
        null,
        `Synonyms relationships for the word:'${word}' updated!`,
      );

      // verifying data is removed
      synonymsToRemove.forEach((synonym) => {
        expect(wordsStore.hasSynonym(word, synonym)).toBe(false);
      });

      expect(response2.statusCode).toBe(HTTP_STATUSES.CREATED);
      expect(response2.body).toEqual(expectedResponse2);
    });
  });
});
