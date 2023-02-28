const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null;
  return blogs.reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr));
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return null;
  const blogCountByAuthor = blogs.reduce((dict, blog) => {
    dict[blog.author] ??= 0;
    dict[blog.author]++;
    return dict;
  }, {});

  const [authorWithMostBlogs, blogCount] = Object.entries(
    blogCountByAuthor
  ).reduce((prev, curr) => (prev[1] > curr[1] ? prev : curr));

  return { author: authorWithMostBlogs, blogs: blogCount };
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
