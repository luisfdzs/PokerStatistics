const logger = require('./logger')

const requestLogger = (request, response, next) => {
  const { method, path, body } = request
  const d = new Date()
  const time = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
  logger.info(`${time} ${method} ${path}`)
  if (body != undefined) logger.info(body)
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(400).json({ error: 'Unknown endpoint' })
}

// eslint-disable-next-line no-unused-vars
const handleError = (error, request, response, next) => {
  const { name, message } = error
  response.status(400).json({ error: name, errormsg: message })
}

module.exports = { requestLogger, unknownEndpoint, handleError }
