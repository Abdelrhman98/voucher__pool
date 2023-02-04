import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configuration from '../../config/index.js';

const { APP_SECRET } = configuration.auth;
import UserModel from '../../server/users/models/usersModel.js'
import { USER_BASIC_DATA, } from '../../server/users/helpers/constants.js'

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: APP_SECRET, // get a secret from env variable or meteor setting.
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    const issuingDate = new Date(0);
    issuingDate.setUTCSeconds(payload.iat);

    const user = await UserModel.findOne({ email: payload.email }, USER_BASIC_DATA);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  }),
);

export default { initialize: passport.initialize() };