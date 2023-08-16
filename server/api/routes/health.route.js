const express = require('express');

const router = express.Router();

router.route('/').get((_, res) => {
  res.json({ message: 'Server is up!' });
});

module.exports = router;
