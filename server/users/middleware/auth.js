import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import logger from '../../../config/winston.js';
import config from '../../../config/index.js';
import UserModel from '../models/usersModel.js'
import {
  EMAIL_FOUND_ERR,
  INVALID_EMAIL_PASSWORD,
} from '../../../common/ERROR_MSG.js';

import {
  USER_BASIC_DATA,
  USER_CONF_DATA,
  USER__LOGIN,
  USER__ADD_NEW_USER,
} from '../helpers/constants.js';

export default {
  [USER__ADD_NEW_USER]: async (req, res, next) => {
    try {
      const user = req.body;
      const { password, email } = user;
      console.log("🚀 ~ file: auth.js:26 ~ [USER__ADD_NEW_USER]: ~ password", password)

      logger.info(`[users][authmiddleware]: ${req.body.fullName}`);
      const hashedPassword = await bcrypt.hashSync(password, 10);
      user.password = hashedPassword;
      user.isFullyCreated = false;
      let userByEmail = await UserModel.findOne({ email }, { fields: USER_BASIC_DATA });
      if (!_.isEmpty(userByEmail)) {
        res.status(EMAIL_FOUND_ERR.status).json({ success: false, msg: EMAIL_FOUND_ERR.msg.en });
      } else {
        await UserModel.create(user);
        const newUser = await UserModel.findOne({ email }, { fields: USER_BASIC_DATA })
        const token = jwt.sign(newUser, config.auth.APP_SECRET);
        res.status(200).send({ success: true, data: newUser, token });
        }
      } catch (err) {
        logger.error(`[users][authmiddleware]: ${err}`);
        throw new Error(err);
      }
    },

    [USER__LOGIN]: async (req, res, next) => {
      try {
        const loggedUser = req.body;
        const { password, email } = loggedUser;
        logger.info(`[users][authmiddleware]: ${req.body.email} trying to logIn !`);
        const user = await UserModel.findOne({ email }, USER_CONF_DATA);
        if (_.isEmpty(user)) {
          res.status(INVALID_EMAIL_PASSWORD.status).json({ success: false, msg: INVALID_EMAIL_PASSWORD.msg.en });
        }
        bcrypt.compare(password, user.password, function (err, ress) {
          if (err) {
            res.status(INVALID_EMAIL_PASSWORD.status).json({ success: false, msg: INVALID_EMAIL_PASSWORD.msg.en });
          }
          if (ress) {
            delete user['password'];
            const token = jwt.sign(user, config.auth.APP_SECRET);
            res.status(200).send({ success: true, data: user, token });
          } else {
            res.status(INVALID_EMAIL_PASSWORD.status).json({ success: false, msg: INVALID_EMAIL_PASSWORD.msg.en });
          }
        });
      } catch (err) {
        logger.error(`[users][authmiddleware]: ${err}`);
        throw new Error(err);
      }
    },
}
