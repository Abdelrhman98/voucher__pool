import express from 'express';
import validateRequest from '../../common/joi.js';
import validationSchemas from './validations/index.js';
import auth_middleware from './middleware/auth.js';

import {
    USER__LOGIN,
    USER__ADD_NEW_USER,
} from './helpers/constants.js';

const Router = express.Router();

Router.post('/login',
    validateRequest(validationSchemas[USER__LOGIN]),
    auth_middleware[USER__LOGIN]);

Router.post('/signup',
    validateRequest(validationSchemas[USER__ADD_NEW_USER]),
    auth_middleware[USER__ADD_NEW_USER]);

export default Router;
