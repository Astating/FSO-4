const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  logger.error('yo', error.message);

  switch (error.name) {
    case 'ValidationError':
      return response.status(400).send(error.message);
    default:
      next(error);
  }
};

module.exports = { errorHandler };
