import Joi from 'joi';

import {
  USER__ADD_NEW_USER,
  USER__LOGIN,
} from '../helpers/constants.js';

export default {
  [USER__ADD_NEW_USER]: {
    body: Joi.object().keys({
      fullName: Joi.string().required().min(1).max(40),
      password: Joi.string().required().regex(/^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/).min(10).max(50),
      email: Joi.string().required().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
      Mobile: Joi.string().required().min(10).max(11),
      roles: Joi.array().default(['Customer']).items(Joi.string()),
    }),
  },

  [USER__LOGIN]: {
    body: Joi.object()
      .keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
      })
  },
};
