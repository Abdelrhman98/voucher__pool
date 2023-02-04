export const EMAIL_FOUND_ERR = { status: 400, msg: { en: 'This mail is already exists!', ar: '' } };

export const INVALID_EMAIL_PASSWORD = { status: 400, msg: { en: 'Invalid email or password!', ar: '' } };
export const VOUCHER_NOT_FOUND = { status: 400, msg: { en: 'Voucher code not found!', ar: '' } }
export const VOUCHER_IS_ALREADY_USED = { status: 400, msg: { en: 'Voucher code is already used!', ar: '' } }
export default {
    EMAIL_FOUND_ERR,
    INVALID_EMAIL_PASSWORD,
    VOUCHER_NOT_FOUND,
    VOUCHER_IS_ALREADY_USED,
}
