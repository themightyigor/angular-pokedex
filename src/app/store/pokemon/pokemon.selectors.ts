import { createSelector } from '@ngrx/store';
import { PokemonState } from './pokemon.reducer';

export const selectPokemonState = (state: { pokemon: PokemonState }) => state.pokemon;

export const selectAllPokemons = createSelector(selectPokemonState, (state) => state.pokemons);

const selectPokemonId = createSelector(selectPokemonState, (state) => state.selectedPokemonId);

export const selectPokemon = createSelector(selectAllPokemons, selectPokemonId, (pokemons, pokemonId) => {
  return pokemons.find((pokemon) => pokemon.id === pokemonId);
});

export const selectSearchedPokemons = createSelector(selectPokemonState, (state) => state.searchedPokemons);
