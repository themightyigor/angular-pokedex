import { createReducer, on } from '@ngrx/store';
import * as PokemonActions from './pokemon.actions';
import { initialState, adapter } from './pokemon.state';

export const reducer = createReducer(
  initialState,
  on(PokemonActions.loadPokemons, (state) => {
    return { ...state, loading: true };
  }),
  on(PokemonActions.loadPokemonsSuccess, (state, { pokemons }) => {
    return adapter.setAll(pokemons, { ...state, loading: false });
  }),
  on(PokemonActions.searchPokemon, (state) => {
    return { ...state, loading: true };
  }),
  on(PokemonActions.searchPokemonSuccess, (state, { pokemons }) => {
    return adapter.setAll(pokemons, { ...state, loading: false });
  }),
  on(PokemonActions.loadPokemon, (state, { id }) => {
    return { ...state, loading: true, selectedId: id };
  }),
  on(PokemonActions.loadPokemonSuccess, (state, { pokemon }) => {
    return adapter.upsertOne(pokemon, { ...state, loading: false });
  }),
  on(PokemonActions.updatePokemon, (state) => {
    return { ...state, loading: true };
  }),
  on(PokemonActions.updatePokemonSuccess, (state, { updatedPokemon }) => {
    return adapter.updateOne({ id: updatedPokemon._id, changes: updatedPokemon }, { ...state, loading: false });
  }),
  on(PokemonActions.catchPokemon, (state) => {
    return { ...state, loading: true };
  }),
  on(PokemonActions.catchPokemonSuccess, (state, { id }) => {
    return adapter.updateOne({ id, changes: { isCaught: true } }, { ...state, loading: false });
  }),
  on(PokemonActions.releasePokemon, (state) => {
    return { ...state, loading: true };
  }),
  on(PokemonActions.releasePokemonSuccess, (state, { id }) => {
    return adapter.updateOne({ id, changes: { isCaught: false } }, { ...state, loading: false });
  })
);
