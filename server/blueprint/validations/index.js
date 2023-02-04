import Joi from 'joi';

import {
    defaults
} from '../helpers/constants.js';

export default {
    [defaults]: {
        body: Joi.object().keys({}),
    }
}