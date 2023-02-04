import _ from 'lodash';
import logger from '../../../config/winston.js';
import UserModel from '../models/usersModel.js'

import {
  PUBLIC_FOUND_ERR,
  INSTGRAM_FOUND_ERR
} from '../../../common/ERROR_MSG.js';

export const profile = async (user, payload) => {
  try {
    const { _id, email, } = user;
    let { publicName } = payload;
    payload.isFullyCreated = true;
    publicName = `${publicName}`;
    payload.publicName = publicName;
    const userByPublicName = await UserModel.findOne({ publicName });
    if (!_.isEmpty(userByPublicName)) {
      // throw new ErrorResponse(PUBLIC_FOUND_ERR.msg.en, PUBLIC_FOUND_ERR.status);
      return { success: false, msg: PUBLIC_FOUND_ERR.msg.en };
    }
    const instgram = _.get(payload, 'instgram', null);
    if (instgram) {
      const userByInstgram = await UserModel.findOne({ 'social.instgram': instgram });
      if (!_.isEmpty(userByInstgram)) {
        return { success: false, msg: INSTGRAM_FOUND_ERR.msg.en };
      }
      payload['social'] = {}
      payload.social['instgram'] = instgram;
      delete payload.instgram;
    }

    if (payload.firebaseUrl)
      console.log(payload)
    let result = await UserModel.update(_id, payload);
    const updatedUser = await UserModel.findOne({ email });
    delete updatedUser.password;
    return { success: true, responseTime: _.get(result, '_writeTime._seconds', null), updatedUser };
  } catch (err) {
    logger.error(`[auth controller][profile] : ${err}`)
  }
}
