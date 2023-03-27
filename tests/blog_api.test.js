const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');

const api = supertest(app);

const initialData = [
  { title: 'Green', author: 'Greene', likes: 0, url: 'gr.ee.n' },
  { title: 'Blue', author: 'Blueberry', likes: 0, url: 'blu.ee' },
];

beforeEach(async () => {
  await Blog.deleteMany();

  await Promise.all(initialData.map((blogData) => new Blog(blogData).save()));
});

test('get ze blogz', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('blogs have an id', async () => {
  const { body } = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(body[0]._id).toBeUndefined();
  expect(body[0].id).toBeDefined();
});

test('add one', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: 'Benjie',
      author: 'Turtle McFly',
      likes: 0,
      url: 'Blueberry',
    })
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const { body } = await api.get('/api/blogs');

  expect(body.length).toEqual(3);
  expect(body[2]).toHaveProperty('title', 'Benjie');
});

test('add blog without specifying likes', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: 'Benjie',
      author: 'Turtle McFly',
      url: 'Blueberry',
    })
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const { body } = await api.get('/api/blogs');

  expect(body[2]).toHaveProperty('likes', 0);
});

test('should return 400 when title or url are not specified', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: 'Benjie',
      author: 'Turtle McFly',
    })
    .expect(400);

  await api
    .post('/api/blogs')
    .send({
      author: 'Turtle McFly',
      url: 'Blueberry',
    })
    .expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
