const { MONGO_DB_URI } = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose
  .connect(MONGO_DB_URI)
  .then(logger.info('DB Connected'))
  .catch((error) => logger.error(error))
