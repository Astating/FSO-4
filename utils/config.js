const dotenv = require('dotenv');
const { expand } = require('dotenv-expand');

const myEnv = dotenv.config();
expand(myEnv);

const { PORT, MONGODB_URI } = process.env;

module.exports = {
  MONGODB_URI,
  PORT,
};
