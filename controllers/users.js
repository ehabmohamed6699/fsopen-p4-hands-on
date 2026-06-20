const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response, next) => {
    response.json(await User.find({}).populate('blogs', {title: 1, url: 1, likes: 1}))
})

usersRouter.post('/', async (request, response, next) => {
    const {name, username, password} = request.body
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
        username,
        name,
        passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter