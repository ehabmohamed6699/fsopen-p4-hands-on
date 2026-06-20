const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "I built my portfolio website in React!",
        author: "Mike Wazowski",
        url: "https://my.portfolio.co",
        likes: 3
    },
    {
        title: "PyTorch is dying",
        author: "Chick Hicks",
        url: "https://pytorch.org",
        likes: 16,
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: "abcdefgh", url: "https://fake.url.co" })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}