require('dotenv').config()
const config = require('config')
const PORT = config.get('port')
const SECRET = config.get('secret')
const currentEnv = process.env.NODE_ENV || 'development'
const MONGODB_URI = config.get(`db.${currentEnv}`)
console.log(MONGODB_URI)
if (!MONGODB_URI) throw new Error('MONGODB_URI missing')

module.exports = {PORT, MONGODB_URI, SECRET}