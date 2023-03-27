const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find();
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { likes = 0, ...rest } = request.body;

  if (!rest.title || !rest.url) return response.status(400).end();

  const blog = await new Blog({ ...rest, likes }).save();

  response.status(201).json(blog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, likes, url } = request.body;
  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      title,
      author,
      likes,
      url,
    },
    { new: true }
  );
  response.json(updated);
});

module.exports = blogsRouter;
