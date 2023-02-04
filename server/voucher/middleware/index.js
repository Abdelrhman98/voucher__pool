import _ from 'lodash';

import logger from '../../../config/winston.js';
import config from '../../../config/index.js';
import VoucherModel from '../models/index.js'

import {
  voucher_apply,
  voucher_create,
} from '../helpers/constants.js';

import {
  voucherController__apply,
  voucherController__create,
} from '../controllers/index.js';

export default {
  [voucher_apply]: async (req, res, next) => {
    try {
      const { user, body: payload } = req;
      const response = await voucherController__apply(user, payload);
      res.send({ status: response.status, message: response.message, success: response.success })
    } catch (err) {
      logger.error(`[voucher][voucher_apply]: ${err}`);
      throw new Error(err);
    }
  },

  [voucher_create]: async (req, res, next) => {
    try {
      const { user, body: payload } = req;
      const response = await voucherController__create(user, payload);
      res.send({ status: 201, message: response.message, success: response.success })
    }catch (err) {
      logger.error(`[voucher][voucher_create]: ${err}`);
      throw new Error(err);
    }
  }
}
