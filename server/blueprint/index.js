import express from 'express';
// import multer from 'multer';
import validateRequest from '../../common/joi.js';
import validationSchemas from './validations/index.js';
import defaults_middleware from './middleware/index.js';
// import AuthAPI from '../../common/middleware/auth.js';
// import uploadImage from '../../lib/file/fileUploader.js';
import { 
    defaults
   
} from './helpers/constants.js';
const Router = express.Router();

Router.get('/create',
    validateRequest(validationSchemas[defaults]),
    defaults_middleware[defaults]
);

export default Router;
