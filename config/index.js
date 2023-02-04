import dotenv from 'dotenv';
import redisCred from '../common/cache/redis.js';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const environment = process.env.NODE_ENV;

export const rootUrl = process.env.ROOT_URL || 'http://localhost:3000';
export const publicLink__Prefix = 'rakha.om/'
export const connectionsUrl = {
  mongo: process.env.MONGO_URL|| 'mongodb://localhost:27017/voucher_pool',
};


export const redis = redisCred.default;

// auth, notifier/index, urlShortner/index and maps
export const auth = {
  APP_SECRET: process.env.APP_SECRET || 'the default secret',
  APP_SALT: process.env.APP_SALT || 10,
  // googleClientId: process.env.GOOGLE_CLIENT_ID,
  // googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

// expressRouter and main
export const expressRouter = {
  port: process.env.PORT || 3000,
};

// userService, userServiceV2, users/middlewarel/index and users/middlewarel/v2/index
export const userService = {
  secret: process.env.APP_SECRET || 'the default secret',
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || '1d',
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '30d',
};

export const DEFAULT_LIMIT = 10;
export default {
  environment,
  rootUrl,
  connectionsUrl,
  redis,
  auth,
  expressRouter,
  userService,
  DEFAULT_LIMIT,
}