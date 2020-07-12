const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

// Create local strategy
const localStrategy = new LocalStrategy(
  {
    usernameField: 'name',
  },
  (name, password, done) => {
    console.log(name);
    User.findOne({ name }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user);
      });
    });
  }
);

const bearerStrategy = new BearerStrategy(function (token, done) {
  jwt.verify(token, config.get('jwtSecret'), function (err, decoded) {
    if (err) throw err;
    User.findById({ _id: decoded.user.id }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});

passport.use(localStrategy);
passport.use(bearerStrategy);
