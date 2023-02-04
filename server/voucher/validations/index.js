import Joi from 'joi';

import {
    voucher_apply,
    voucher_create,
} from '../helpers/constants.js';

export default {
    [voucher_apply]: {
        body: Joi.object().keys({
            voucherCode: Joi.string().required(),
        }),
    },
    [voucher_create]: {
        body: Joi.object().keys({
            voucherNo: Joi.number().required().min(1).max(10000),
            minDiscount: Joi.number().required().min(1).max(10000),
            maxDiscount: Joi.number().required().min(1).max(10000),
        }),
    }
}