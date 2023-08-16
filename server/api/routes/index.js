const express = require('express');

const wordRoute = require('./word.route');
const healthRoute = require('./health.route');

const router = express.Router();

const routes = [
  {
    path: '/health',
    route: healthRoute,
  },
  {
    path: '/words',
    route: wordRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
