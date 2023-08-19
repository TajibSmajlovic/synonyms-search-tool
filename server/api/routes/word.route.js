const express = require('express');

const { wordController } = require('@controllers');

const router = express.Router();

router.route('/').get(wordController.getWords);
router.route('/synonyms-tree').get(wordController.getSynonymsTree);
router
  .route('/synonyms')
  .get(wordController.getSynonyms)
  .post(wordController.addSynonyms);

module.exports = router;
