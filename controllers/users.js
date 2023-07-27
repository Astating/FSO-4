const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const User = require('../models/User');

usersRouter.get('/', async (_req, response) => {
  const users = await User.find();

  response.status(200).json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body;

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
