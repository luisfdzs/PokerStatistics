const { Schema, model } = require('mongoose')

const resultSchema = new Schema({
  buyIn: Number,
  winnings: Number,
})

resultSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = model('Result', resultSchema)
