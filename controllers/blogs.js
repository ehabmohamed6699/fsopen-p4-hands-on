const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  
  const blogs = await Blog.find({}).populate('author', {name: 1, username: 1})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id

  const blog = await Blog.findById(id).populate('author', {name: 1, username: 1})
  blog ? response.json(blog) : response.status(404).send({message: "Blog not found"})
})

blogsRouter.post('/', async (request, response, next) => {
  const user = await User.findById(request.body.userId)
  if (!user){
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  const blog = new Blog({...request.body, author: user._id})
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const blog = await Blog.findById(id).populate('author', {name: 1, username: 1})
  if(blog){
    blog.title = request.body.title
    blog.url = request.body.url
    blog.likes = request.body.likes || blog.likes
    await blog.save()
    response.status(200).json(blog)
  }else{
    response.status(404).send({message: "Blog not found"})
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  if(blog){
    await blog.deleteOne()
    response.status(204).end()
  }else{
    response.status(404).send({message: "Blog not found"})
  }
})

module.exports = blogsRouter