export const EMAIL_FOUND_ERR = { status: 400, msg: { en: 'This mail is already exists!', ar: '' } };
export const PUBLIC_FOUND_ERR = { status: 400, msg: { en: 'This public link is already exists!', ar: '' } };
export const INSTGRAM_FOUND_ERR = { status: 400, msg: { en: 'This instgram link is already exists!', ar: '' } };

export const INVALID_EMAIL_PASSWORD = { status: 400, msg: { en: 'Invalid email or password!', ar: '' } };
export const CANT_UPDATE_USER = { status: 202, msg: { en: 'update action is not commited!', ar: '' } };
export const FAILURE_TO_SEND_RESET_LINK = { status: 202, msg: { en: 'your mail not found !', ar: '' } };
export default {
    EMAIL_FOUND_ERR,
    INVALID_EMAIL_PASSWORD,
    PUBLIC_FOUND_ERR,
    CANT_UPDATE_USER,
    FAILURE_TO_SEND_RESET_LINK,
    INSTGRAM_FOUND_ERR
}
