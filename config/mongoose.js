import mongoose from 'mongoose';
import configuration from './index.js';

import logger from '../config/winston.js'

const connectionUrl = configuration.connectionsUrl.mongo;

const mongooseConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  connectTimeoutMS: 360000,
  socketTimeoutMS: 360000,
};

mongoose.connection.on('error', (err) => {
  logger.error(`mongoose connection error: ${err}`);
});

export default mongoose.connect(connectionUrl, mongooseConnectionOptions, (error) => {
  if (error) {
    logger.error(`[mongoose.js] Connecting to MongoDB server error ${error.message}`);
  } else logger.info('[mongoose.js] Connected successfully to MongoDB server');
});
