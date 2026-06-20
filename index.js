const app = require('./app')
const logger = require('./utils/logger')
const {PORT} = require('./utils/config')
const mostBlogs = require('./utils/helpers').mostBlogs


app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})