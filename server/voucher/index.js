import express from 'express';

import validateRequest from '../../common/joi.js';
import validationSchemas from './validations/index.js';
import AuthAPI from '../../common/middleware/auth.js';
import voucher_middleware from './middleware/index.js';
import { 
    voucher_apply,
    voucher_create,
} from './helpers/constants.js';
const Router = express.Router();

Router.put('/apply',
    AuthAPI('test'),
    validateRequest(validationSchemas[voucher_apply]),
    voucher_middleware[voucher_apply]
);


Router.post('/generate',
    AuthAPI('test'),
    validateRequest(validationSchemas[voucher_create]),
    voucher_middleware[voucher_create]
);
export default Router;
