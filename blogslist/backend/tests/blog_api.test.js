const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogList
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test(`All blogs are returned (Total of ${helper.initialBlogList.length} blog(s))`, async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogList.length)
})

test('One of the blogs is about gaming', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(e => e.title.toLowerCase())
  assert(titles.some(title => title.includes('gamer')),
    `Titles: ${titles.join(', ')} should include 'gamer' (case-insensitive)`)
})

test('A valid blog can be added ', async () => {
  const newBlog = {
    title: 'Linux > Windows',
    author: 'Linus Torvalds',
    url: 'https://linuxisbetter.wordpress.com',
    likes: 1000000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogList.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  assert(titles.some(title => title.includes('Linux > Windows')))
})

test('Blog post has id property instead of _id', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://testblog.com',
    likes: 10
  }
  
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
  
  // Check that the response contains 'id' and not '_id'
  assert(response.body.id, 'Blog post should have an id property')
  assert.strictEqual(response.body._id, undefined, '_id should not be included in the response')
})
  

test('Blog without a title is not added', async () => {
  const newBlog = {
    author: 'Anonymous',
    url: 'https://doesntwork.blogspot.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogList.length)
})

test('Blog without an author is not added', async () => {
  const newBlog = {
    title: 'This Doesn\'t Work',
    url: 'https://doesntwork.blogspot.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogList.length)
})

test('Blog without an url is not added', async () => {
  const newBlog = {
    title: 'This Doesn\'t Work',
    author: 'Anonymous',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogList.length)
})

test('Blog without likes is not added', async () => {
  const newBlog = {
    title: 'This Doesn\'t Work',
    author: 'Anonymous',
    url: 'https://doesntwork.blogspot.com'
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const blogsAtEnd = await helper.blogsInDb()
  
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogList.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const contents = blogsAtEnd.map(r => r.title)
  assert(!contents.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogList.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})