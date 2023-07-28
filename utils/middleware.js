const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  logger.error('yo', error.message);

  switch (error.name) {
    case 'ValidationError':
      return response.status(400).send({ error: error.message });
    case 'JsonWebTokenError':
      return response.status(401).json({ error: error.message });
    case 'TokenExpiredError':
      return response.status(401).json({ error: 'Token expired' });
    default:
      next(error);
  }
};


const tokenExtractor = (request, _response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  }
  next();
};


module.exports = { errorHandler, tokenExtractor };
