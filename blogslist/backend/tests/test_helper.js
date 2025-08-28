const Blog = require('../models/blog')

const initialBlogList = [
  {
    title: 'Gamer\'s Den',
    author: 'Lara Croft',
    url: 'https://thegamersden.wordpress.com',
    likes: 9001
  },
  {
    title: 'Star Wars Fans',
    author: 'Luke Blogwalker',
    url: 'https://realstarwarsfans.blogspot.com',
    likes: 2
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogList = await Blog.find({})
  return blogList.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogList, nonExistingId, blogsInDb
}