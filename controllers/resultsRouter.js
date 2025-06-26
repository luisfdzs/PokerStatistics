const mongoose = require('mongoose')
const resultsRouter = require('express').Router()
const Result = require('../models/Result')

resultsRouter.get('/', (request, response, next) => {
  Result.find({})
    .then((results) => response.status(200).json(results))
    .catch((error) => next(error))
})

resultsRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return response.status(400).json({ error: 'Result not found' })
  Result.findById(id)
    .then((result) => {
      if (!result)
        return response.status(404).json({ error: 'Result not found' })
      response.status(200).json(result)
    })
    .catch((error) => next(error))
})

resultsRouter.post('/', (request, response, next) => {
  const { buyIn, winnings } = request.body
  const result = {
    buyIn: buyIn,
    winnings: winnings,
  }
  new Result(result)
    .save()
    .then((result) => response.status(200).json(result))
    .catch((error) => next(error))
})

resultsRouter.put('/:id', (request, response, next) => {
  const { id } = request.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return response.status(400).json({ error: 'Result not found' })
  const { buyIn, winnings } = request.body
  const result = {
    buyIn: buyIn,
    winnings: winnings,
  }
  Result.findByIdAndUpdate(id, result, { new: true })
    .then((result) => {
      if (!result)
        return response.status(404).json({ error: 'Result not found' })
      response.status(200).json(result)
    })
    .catch((error) => next(error))
})

resultsRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return response.status(400).json({ error: 'Result not found' })
  Result.findByIdAndDelete(id)
    .then((result) => {
      if (!result)
        return response.status(404).json({ error: 'Result not found' })
      response
        .status(200)
        .json({ response: `Result ${id} deleted successfully` })
    })
    .catch((error) => next(error))
})

module.exports = resultsRouter
