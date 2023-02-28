const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null;
  return blogs.reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr));
};

module.exports = {
  totalLikes,
  favoriteBlog,
};
