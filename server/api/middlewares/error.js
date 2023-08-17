const { HTTP_STATUSES } = require('@constants');
const { ApiError } = require('@utils/errors');
const { response: responseDto } = require('@models/dtos');

// eslint-disable-next-line no-unused-vars
const errorConverter = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || HTTP_STATUSES.INTERNAL_SERVER_ERROR;
    const message =
      statusCode === HTTP_STATUSES.INTERNAL_SERVER_ERROR
        ? 'Unable to complete the request.'
        : error.message;

    error = new ApiError(statusCode, message);
  }

  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  const response = responseDto.generate(null, message);

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
