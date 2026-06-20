const express = require('express')
const mongoose = require('mongoose')
const {MONGODB_URI} = require('./utils/config')
const {requestLogger, unknownEndpoint, errorHandler} = require('./utils/middleware')
const logger = require('./utils/logger')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const app = express()
mongoose.set('strictQuery', false)

logger.info('Connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {family: 4})
    .then(result => {
        logger.info('Connected!')
    })
    .catch(error => {
        console.error(error)
    })


app.use(express.json())
app.use(cors())
app.use(requestLogger)

app.get("/", (req, res) => {
    res.send(`
        <h1 style="color:#2629F8;font-family:sans-serif">Welcome to our blog API</h1>    
    `)
})
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app