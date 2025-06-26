const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const cors = require('cors')
const resultsRouter = require('./controllers/resultsRouter')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/results', resultsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.handleError)

module.exports = app
