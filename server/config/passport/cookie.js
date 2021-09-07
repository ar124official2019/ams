const passport = require('passport');
const userModel = require('../../models/user');
const CookieStrategy = require('passport-cookie');

passport.use(new CookieStrategy({
  cookieName: 'token',
}, function(token, done) {
  try {
    userModel.findByToken(token, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  } catch (err) {
    return done(err);
  }
}));