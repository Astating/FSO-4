const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const User = require('../models/User');
const { ValidationError } = require('../utils/errors');

usersRouter.get('/', async (_req, response) => {
  const users = await User.find().populate('blogs', { likes: 0, user: 0 });

  response.status(200).json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body;

  if (!password || password.length < 3) {
    throw new ValidationError(
      'Password is required and should be at least three-character long'
    );
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await new User({
    username,
    password: passwordHash,
    name,
  }).save();

  response.status(201).json(user);
});

module.exports = usersRouter;
