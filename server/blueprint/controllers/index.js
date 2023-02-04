import _ from 'lodash';
import crypto from '../../../config/crypto.js';
import logger from '../../../config/winston.js';
import config from '../../../config/index.js';
import redisCred from '../../../common/cache/redis.js'
import UserModel from '../models/usersModel.js'
import redis from '../../../config/redis.js';
import bcrypt from 'bcrypt';

import {

} from '../../../common/ERROR_MSG.js';

import {
    defaults
} from '../helpers/constants.js';
import ErrorResponse from '../../../config/errorResponse.js';

import SEND_MAIL from '../../../lib/email/mandrill.js'
export const defaults = async (user, payload) => {
    try {
        return true;
    } catch (err) {
        logger.error(`[auth controller][post__forgetPassword] : ${err}`)
    }
}
