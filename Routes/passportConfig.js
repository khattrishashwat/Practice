const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const User = require("../model/signup");

const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'kha'
};

const strategy = new passportJWT.Strategy(jwtOptions, (jwt_payload, next) => {
  const user = User.find(u => u.id === jwt_payload.id);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

module.exports = { passport, jwt, User };
