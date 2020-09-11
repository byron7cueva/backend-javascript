const { config } = require('../../config');
const boom = require('@hapi/boom');

function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack }
  }

  return error;
}

function logError(error, request, response, next) {
  console.log(error);
  next(error)
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function errorHandle(error, request, response, next) { // eslint-disable-line
  const { output: { statusCode, payload }} = error;
  response.status(statusCode);
  response.json(withErrorStack(payload, error.stack))
}

module.exports = {
  logError,
  errorHandle,
  wrapErrors
}