const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

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

afterAll(async () => {
  await mongoose.connection.close();
});
