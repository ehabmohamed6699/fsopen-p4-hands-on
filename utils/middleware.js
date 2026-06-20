const morgan = require('morgan')
const logger = require('./logger')

const requestLogger = morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body) || ''
    ].join(' ')
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "Unknown endpoint"})
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }else if(error.name === 'MongoServerError'){
    return response.status(400).json({error: error.message})
  }
  next(error)
}

module.exports = {requestLogger, unknownEndpoint, errorHandler}