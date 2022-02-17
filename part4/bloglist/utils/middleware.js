const logger = require('./logger')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  
  next()
}

const userExtractor = (request, response, next) => {
  if(!request.token) {
    return response.status(401).json({error: 'token missing'})
  }
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = decodedToken.id
  } catch {
    return response.status(401).json({error: 'token invalid'})
  }

  
  
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = { tokenExtractor, userExtractor, errorHandler }