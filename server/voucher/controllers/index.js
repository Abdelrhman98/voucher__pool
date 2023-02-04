import _ from 'lodash';
import logger from '../../../config/winston.js';
import VoucherModel from '../models/index.js';

import {

} from '../../../common/ERROR_MSG.js';

import {
    
} from '../helpers/constants.js';
import ErrorResponse from '../../../config/errorResponse.js';

import SEND_MAIL from '../../../lib/email/mandrill.js'
export const voucher_apply = async (user, payload) => {
    try {
        return true;
    } catch (err) {
        logger.error(`[auth controller][post__forgetPassword] : ${err}`)
    }
}
