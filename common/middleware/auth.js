import _ from 'lodash';
import passport from 'passport';

export default function AuthAPI(endPointName) {
  return async function (req, res, next) {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({
          message: 'Invalid authorization token or API key.',
        });
      }
      passport.authenticate('jwt', { session: false }, async (err, user) => {
        // const isAuthorized = currentUserRoles.some((r) => endPointRoles.indexOf(r) > -1);
        const isAuthorized = true;
        if (isAuthorized && user) {
            req.user = user;
          return next();
        }
        res.status(401).json({
          message: 'user is not authorized to perform this action',
        });
      })(req, res, next);
    } catch (err) {
      logger.error(`[AuthAPI] error: ${err.message}`);
      return next(new ErrorResponse(err.message, err.status || INTERNAL_SERVER_ERROR, err.errorCode));
    }// end of catch
  };
}
