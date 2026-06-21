const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')
const {SECRET} = require('../utils/config')

loginRouter.post('/', async (request, response, next) => {
    const {username, password} = request.body
    const user = await User.findOne({username})

    const passwordMatch = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    if(!(user && passwordMatch)){
        return response.status(401).json({
            error: "invalid credentials"
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, SECRET, {expiresIn: 60*60*3})
    response.status(201).send({token, username: user.username, name: user.name})
})

module.exports = loginRouter