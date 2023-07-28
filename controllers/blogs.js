const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find().populate('user', { blogs: 0 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { likes = 0, ...rest } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(400).json({ error: 'Token invalid' });
  }

  if (!rest.title || !rest.url) return response.status(400).end();

  const user = await User.findById(decodedToken.id);

  const blog = await new Blog({ ...rest, likes, user: user.id }).save();
 
  user.blogs = user.blogs.concat(blog.id);
  await user.save();

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
