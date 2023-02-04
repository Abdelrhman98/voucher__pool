import _ from 'lodash';

import logger from '../../../config/winston.js';
import config from '../../../config/index.js';
import VoucherModel from '../models/index.js'

import {
  voucher_apply
} from '../helpers/constants.js';

import {

} from '../controllers/index.js';

export default {
  [voucher_apply]: async (req, res, next) => {
    try {
      res.send(defaults)
    } catch (err) {
      logger.error(`[blue][default]: ${err}`);
      throw new Error(err);
    }
  },
}
