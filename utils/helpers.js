const lodash = require("lodash")

const totalLikes = (blogs) => {
    return blogs.reduce((total, x) => total + x.likes, 0)
}

const favoriteBlog = (blogs) => {
    let mostLikes = 0, favorite = null
    blogs.forEach(blog => {
        if(blog.likes >= mostLikes){
            favorite = blog,
            mostLikes = blog.likes
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0){
        return null
    }
    let authorsWithTheirBlogsCount = lodash.mapValues(lodash.groupBy(blogs, (item) => item.author), (v) => v.length)
    let mostBlogsCount = lodash.max(lodash.values(authorsWithTheirBlogsCount))
    return {
        author: lodash.get(lodash.invert(authorsWithTheirBlogsCount), mostBlogsCount.toString()),
        blogs: mostBlogsCount
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0){
        return null
    }
    let authorsWithTheirBlogsLikesCount = lodash.mapValues(lodash.groupBy(blogs, (item) => item.author), (v) => v.reduce((acc, b) => acc + b.likes, 0))
    let mostBlogsLikesCount = lodash.max(lodash.values(authorsWithTheirBlogsLikesCount))
    return {
        author: lodash.get(lodash.invert(authorsWithTheirBlogsLikesCount), mostBlogsLikesCount.toString()),
        likes: mostBlogsLikesCount
    }
}

module.exports = {totalLikes, favoriteBlog, mostBlogs, mostLikes}