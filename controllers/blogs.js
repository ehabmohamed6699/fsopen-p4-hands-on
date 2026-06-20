const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id

  const blog = await Blog.findById(id)
  blog ? response.json(blog) : response.status(404).send({message: "Blog not found"})
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  if(blog){
    blog.title = request.body.title
    blog.author = request.body.author
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