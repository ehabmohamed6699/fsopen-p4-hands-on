const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
    {
        title: "I built my portfolio website in React!",
        url: "https://my.portfolio.co",
        likes: 3
    },
    {
        title: "PyTorch is dying",
        url: "https://pytorch.org",
        likes: 16,
    }
]

const nonExistingId = async () => {
  const passwordHash = await bcrypt.hash("12345678", 10)
  const user = new User({
    username: "dummyuser",
    name: "dummyname",
    passwordHash: passwordHash
  })
  const savedUser = await user.save()
  const blog = new Blog({ title: 'willremovethissoon', author: savedUser._id, url: "https://fake.url.co" })
  await blog.save()
  await blog.deleteOne()
  await savedUser.deleteOne()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate('author', {name: 1, username: 1})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}