import _ from 'lodash';
import logger from '../../../config/winston.js';
import VoucherModel from '../models/index.js';
import nanoid from '../../../config/nanoid.js';
import {
    VOUCHER_NOT_FOUND,
    VOUCHER_IS_ALREADY_USED
} from '../../../common/ERROR_MSG.js';

import {

} from '../helpers/constants.js';


export const voucherController__apply = async (user, payload) => {
    try {
        const { voucherCode } = payload;
        const { _id: userId } = user;
        const targetVoucher = await VoucherModel.findOne({ voucherCode }, {});
        if (_.isNil(targetVoucher)) {
            return { sucess: false, message: VOUCHER_NOT_FOUND.msg.en, status: VOUCHER_NOT_FOUND.status };
        }
        if (_.get(targetVoucher, 'isUsed', false)) {
            return { sucess: false, message: VOUCHER_IS_ALREADY_USED.msg.en, status: VOUCHER_IS_ALREADY_USED.status };
        }
        await VoucherModel.updateOne({ _id: targetVoucher._id }, { $set: { isUsed: true, usedBy: userId, appliedAt: Date.now() } });
        return { sucess: true, message: `Voucher applied successfully with amount ${targetVoucher.amount}` };
    } catch (err) {
        logger.error(`[voucher controller][voucherController__apply] : ${err}`)
    }
}

export const voucherController__create = async (user, payload) => {
    try {
        const { voucherNo, minDiscount, maxDiscount } = payload;
        const { _id: userId } = user;
        const voucherList = [];
        for (let i = 0; i < voucherNo; i++) {
            let amount = Math.floor((Math.random() * maxDiscount) % maxDiscount);
            amount = amount < minDiscount ? minDiscount : amount;
            voucherList.push({
                voucherCode: nanoid().substring(0, 10).toUpperCase(),
                amount,
                createdBy: userId,
            });
        }
        await VoucherModel.insertMany(voucherList);
        return { status: 200, sucess: true, message: 'Voucher created successfully' };
    } catch (err) {
        logger.error(`[voucher controller][voucherController__create] : ${err}`)
    }
}