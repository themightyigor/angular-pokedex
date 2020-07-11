const express = require('express');
const passport = require('passport');

const router = express.Router();

const auth = require('./api/auth');
const pokemons = require('./api/pokemons');
const users = require('./api/users');

// eslint-disable-next-line no-unused-vars
const passportService = require('../services/passport');

router.use('/auth', passport.authenticate('local', { session: false }), auth);
router.use(
  '/pokemons',
  passport.authenticate('bearer', { session: false }),
  pokemons
);
router.use('/users', users);

module.exports = router;
