import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import logger from '../../../config/winston.js';
import config from '../../../config/index.js';
import UserModel from '../models/usersModel.js'
import {

} from '../../../common/ERROR_MSG.js';

import {
  defaults
} from '../helpers/constants.js';

import {

} from '../controllers/index.js';

export default {
  [defaults]: async (req, res, next) => {
    try {
      res.send(defaults)
    } catch (err) {
      logger.error(`[blue][default]: ${err}`);
      throw new Error(err);
    }
  },
}
