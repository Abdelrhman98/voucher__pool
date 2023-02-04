import Joi from 'joi';

import {
    voucher_apply
} from '../helpers/constants.js';

export default {
    [voucher_apply]: {
        body: Joi.object().keys({
            voucherCode: Joi.string().required(),
        }),
    }
}