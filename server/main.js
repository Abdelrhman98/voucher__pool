import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from '../config/mongoose.js';

import configuration from '../config/index.js';
import logger from '../config/winston.js';
import passportStragy from '../common/middleware/passport.js'
import { BASE_URL } from '../common/constants.js';

import users from './users/index.js';
import voucher from './voucher/index.js';

const ExpressApp = express();
ExpressApp.use(bodyParser.urlencoded({ extended: true }));
ExpressApp.use(bodyParser.json());
ExpressApp.use(cors());
ExpressApp.use(passportStragy.initialize);
ExpressApp.get(`${BASE_URL}/healthCheck`, (req, res, next) => {
    res.status(200).send('it works!!!')
});
const port = configuration.expressRouter.port;

ExpressApp.use(`${BASE_URL}/auth`, users);
ExpressApp.use(`${BASE_URL}/voucher`, voucher);

ExpressApp.listen(port, () => {
    logger.info(`Listening on port ${port}`);
});