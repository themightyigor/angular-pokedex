const Pokemon = require('../models/Pokemon');

function addPokemon(pokemon) {
  const { name, damage, isCaught, createdAt } = pokemon;
  const newPokemon = new Pokemon({
    name,
    damage,
    isCaught,
    createdAt,
  });

  return newPokemon.save();
}

function getPokemons(name) {
  return Pokemon.find(name && { name });
}

function getPokemonById(pokemonId) {
  return Pokemon.findById(pokemonId);
}

function updatePokemon(pokemonId, updatedPokemon) {
  return Pokemon.findOneAndUpdate(
    { _id: pokemonId },
    {
      $set: updatedPokemon,
    },
    { new: true }
  );
}

function deletePokemon(pokemonId) {
  return Pokemon.findOneAndRemove({ _id: pokemonId });
}

function catchPokemon(pokemonId) {
  return Pokemon.findOneAndUpdate(
    { _id: pokemonId },
    { isCaught: true },
    { new: true }
  );
}

function releasePokemon(pokemonId) {
  return Pokemon.findOneAndUpdate(
    { _id: pokemonId },
    { isCaught: false },
    { new: true }
  );
}

function getCaptured() {
  return Pokemon.find({
    isCaught: true,
  });
}

module.exports = {
  addPokemon,
  getPokemons,
  getPokemonById,
  updatePokemon,
  deletePokemon,
  catchPokemon,
  getCaptured,
  releasePokemon,
};
