const User = require('../models/User');

function getUser(name) {
  return User.fineOne({ name });
}

module.exports = {
  getUser,
};
