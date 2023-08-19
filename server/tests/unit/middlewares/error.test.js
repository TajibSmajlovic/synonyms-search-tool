const httpMocks = require('node-mocks-http');

const { errorConverter, errorHandler } = require('@middlewares');
const { ApiError } = require('@utils/errors');
const { response } = require('@models/dtos');
const { HTTP_STATUSES } = require('@constants');

describe('Error middlewares', () => {
  test('should return the same ApiError object it was called with', () => {
    const error = new ApiError(HTTP_STATUSES.BAD_REQUEST, 'Any error');
    const next = jest.fn();

    errorConverter(
      error,
      httpMocks.createRequest(),
      httpMocks.createResponse(),
      next,
    );

    expect(next).toHaveBeenCalledWith(error);
  });

  test('should convert an Error to ApiError and preserve its status and message', () => {
    const error = new Error('Any error');
    error.statusCode = HTTP_STATUSES.BAD_REQUEST;
    const next = jest.fn();

    errorConverter(
      error,
      httpMocks.createRequest(),
      httpMocks.createResponse(),
      next,
    );

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: error.statusCode,
        message: error.message,
      }),
    );
  });

  test('should send proper error response', () => {
    const error = new ApiError(HTTP_STATUSES.BAD_REQUEST, 'Any error');
    const res = httpMocks.createResponse();
    const sendSpy = jest.spyOn(res, 'send');

    errorHandler(error, httpMocks.createRequest(), res);

    expect(sendSpy).toHaveBeenCalledWith(
      expect.objectContaining(response.generate(null, error.message)),
    );
  });
});
