const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find();
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { likes = 0, ...rest } = request.body;
  const blog = await new Blog({ ...rest, likes }).save();

  response.status(201).json(blog);
});

module.exports = blogsRouter;
