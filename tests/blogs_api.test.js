const {test, after, describe, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const {initialBlogs, blogsInDb, nonExistingId} = require('./blogs_test_helper')
const Blog = require("../models/blog")

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
    
})

describe('blogs API', () => {
    
    test('blogs are returned as JSON', async () => {
        
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await blogsInDb()
        assert.strictEqual(response.length, initialBlogs.length)
    })

    test('all blogs have id property', async () => {
        const response = await blogsInDb()
        const allHaveIdProperty = response.reduce((acc, blog) => acc && (Object.keys(blog).includes('id')) , true)
        assert(allHaveIdProperty)
    })

    test('a specific blog is existing', async () => {
        // const response = await api.get('/api/blogs')
        const response = await blogsInDb()
        const titles = response.map(x => x.title)
        assert(titles.includes('PyTorch is dying'))
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "Typescript unarguably is the best thing to write software",
            author: "Eyad Alsherif",
            url: "https://www.typescriptlang.org"
        }
        await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
        const data = await blogsInDb()
        assert.strictEqual(data.length, initialBlogs.length + 1)
        const titles = data.map(x => x.title)
        assert(titles.includes('Typescript unarguably is the best thing to write software'))
        assert.strictEqual(data[2].likes, 0)
    })

    test('blog without content is not added', async () => {
        const newBlog = {
            title: "Short"
        }

        await api.post('/api/blogs').send(newBlog).expect(400)

        const data = await blogsInDb()

        assert.strictEqual(data.length, initialBlogs.length)
    })

    test('a blog can be updated', async () => {
        const updates = {
            title: "I updated the first blog of them all",
            author: "updated author",
            url: "http://valid.url.co",
            likes: 100
        }
        const data = await blogsInDb()
        
        await api.put(`/api/blogs/${data[0].id}`).send(updates).expect(200)
        const updatedBlog = (await api.get(`/api/blogs/${data[0].id}`)).body

        assert.strictEqual(updatedBlog.title, updates.title)
        assert.strictEqual(updatedBlog.author, updates.author)
        assert.strictEqual(updatedBlog.url, updates.url)
        assert.strictEqual(updatedBlog.likes, updates.likes)
    })

    test('a blog update with no likes keeps likes same', async () => {
        const updates = {
            title: "I updated the first blog of them all",
            author: "updated author",
            url: "http://valid.url.co",
        }
        const data = await blogsInDb()
        const oldLikes = data[0].likes
        await api.put(`/api/blogs/${data[0].id}`).send(updates).expect(200)
        const updatedBlog = (await api.get(`/api/blogs/${data[0].id}`)).body

        assert.strictEqual(updatedBlog.title, updates.title)
        assert.strictEqual(updatedBlog.author, updates.author)
        assert.strictEqual(updatedBlog.url, updates.url)
        assert.strictEqual(updatedBlog.likes, oldLikes)
    })

    test('cannot update non existing blog', async () => {
        const updates = {
            title: "I updated the first blog of them all",
            author: "updated author",
            url: "http://valid.url.co",
        }
        const nullId = await nonExistingId()
        await api.put(`/api/blogs/${nullId}`).send(updates).expect(404)
    })

    test('can delete existing blog', async () => {
        const data = await blogsInDb()
        const deleteId = data[0].id
        await api.delete(`/api/blogs/${deleteId}`).expect(204)
        await api.get(`/api/blogs/${deleteId}`).expect(404)
    })

    test('cannot delete non existing blog', async () => {
        const nullId = await nonExistingId()
        await api.delete(`/api/blogs/${nullId}`).expect(404)
    })
})

after(async () => {
    await mongoose.connection.close()
})