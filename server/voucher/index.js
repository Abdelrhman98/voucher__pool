import express from 'express';

import validateRequest from '../../common/joi.js';
import validationSchemas from './validations/index.js';
import AuthAPI from '../../common/middleware/auth.js';
import voucher_middleware from './middleware/index.js';
import { 
    voucher_apply
   
} from './helpers/constants.js';
const Router = express.Router();

Router.post('/apply',
    AuthAPI('test'),
    validateRequest(validationSchemas[voucher_apply]),
    voucher_middleware[voucher_apply]
);

export default Router;
