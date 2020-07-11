const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  damage: {
    type: Number,
    required: true,
  },
  isCaught: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// eslint-disable-next-line no-undef
module.exports = Pokemon = mongoose.model('pokemon', PokemonSchema);
