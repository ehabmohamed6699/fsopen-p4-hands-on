const { test, describe } = require('node:test')
const assert = require('node:assert')

const mostLikes = require('../utils/helpers').mostLikes

describe('most blogs', () => {
  test('of empty list is null', () => {
    assert.deepStrictEqual(mostLikes([]), null)
  })

  test('of list with one blog is its likes', () => {
    const blogs = [{
      id: "aaa",
      title: "this is first blog title",
      author: "author1",
      likes: 30
    }]
    assert.deepStrictEqual(mostLikes(blogs), {
        author:"author1",
        likes:30
    })
  })

  test('of a bigger list of blogs is the one with the most', () => {
    const blogs = [{
      id: "aaa",
      title: "this is first blog title",
      author: "author1",
      likes: 30
    },{
      id: "bbb",
      title: "this is second blog title",
      author: "author2",
      likes: 50
    },{
      id: "ccc",
      title: "this is third blog title",
      author: "author1",
      likes: 50
    },{
        id: "ddd",
        title: "this is fourth blog title",
        author: "author2",
        likes: 10
    },{
        id: "eee",
        title: "this is fourth blog title",
        author: "author2",
        likes: 10
    }]
    assert.deepStrictEqual(mostLikes(blogs), {
        author:"author1",
        likes:80
    })
  })
})