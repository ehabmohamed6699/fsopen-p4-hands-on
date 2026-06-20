const { test, describe } = require('node:test')
const assert = require('node:assert')

const totalLikes = require('../utils/helpers').totalLikes

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(totalLikes([]), 0)
  })

  test('of list with one blog is the likes of this blog', () => {
    const blogs = [{
      id: "aaa",
      title: "this is first blog title",
      author: "author1",
      likes: 30
    }]
    assert.strictEqual(totalLikes(blogs), blogs[0].likes)
  })

  test('of a bigger list of blogs', () => {
    const blogs = [{
      id: "aaa",
      title: "this is first blog title",
      author: "author1",
      likes: 30
    },{
      id: "bbb",
      title: "this is second blog title",
      author: "author2",
      likes: 20
    },{
      id: "ccc",
      title: "this is third blog title",
      author: "author1",
      likes: 50
    }]
    assert.strictEqual(totalLikes(blogs), 100)
  })
})