const User = require('../models/user')

const usersInDb = async () => {
    return (await User.find({})).map(user => user.toJSON())
}

module.exports = {usersInDb}