const dotenv = require('dotenv');
const { expand } = require('dotenv-expand');

const myEnv = dotenv.config();
expand(myEnv);

const PORT = process.env.PORT;

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
