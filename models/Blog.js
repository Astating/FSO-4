const mongoose = require('mongoose');
const mongoToJson = require('./utils/toJson');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

blogSchema.set('toJSON', mongoToJson);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
