const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('@routes');
const { config } = require('@config');
const { HTTP_STATUSES } = require('@constants');
const { ApiError } = require('@utils/errors');
const { errorConverter, errorHandler } = require('@middlewares');

const app = express();

app.use(
  cors({
    origin: config.corsOrigin,
  }),
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(HTTP_STATUSES.NOT_FOUND, 'Route not found!'));
});

// if needed convert error to ApiError
app.use(errorConverter);

// handle error
app.use(errorHandler);

// always return json
app.use((err, req, res, next) => {
  res.contentType('application/json');
  next();
});

module.exports = app;
