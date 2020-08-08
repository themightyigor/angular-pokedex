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
  on(PokemonActions.loadPokemonsFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(PokemonActions.searchPokemon, (state) => {
    return { ...state, loading: true };
  }),
  on(PokemonActions.searchPokemonSuccess, (state, { pokemons }) => {
    return adapter.setAll(pokemons, { ...state, loading: false });
  }),
  on(PokemonActions.searchPokemonFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(PokemonActions.loadPokemon, (state, { id }) => {
    return { ...state, loading: true, selectedId: id };
  }),
  on(PokemonActions.loadPokemonSuccess, (state, { pokemon }) => {
    return adapter.upsertOne(pokemon, { ...state, loading: false });
  }),
  on(PokemonActions.loadPokemonFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(PokemonActions.updatePokemon, (state) => {
    return { ...state, loading: true };
  }),
  on(PokemonActions.updatePokemonSuccess, (state, { updatedPokemon }) => {
    return adapter.updateOne({ id: updatedPokemon._id, changes: updatedPokemon }, { ...state, loading: false });
  }),
  on(PokemonActions.updatePokemonFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(PokemonActions.catchPokemon, (state) => {
    return { ...state, loading: true };
  }),
  on(PokemonActions.catchPokemonSuccess, (state, { id }) => {
    return adapter.updateOne({ id, changes: { isCaught: true } }, { ...state, loading: false });
  }),
  on(PokemonActions.catchPokemonFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  }),
  on(PokemonActions.releasePokemon, (state) => {
    return { ...state, loading: true };
  }),
  on(PokemonActions.releasePokemonSuccess, (state, { id }) => {
    return adapter.updateOne({ id, changes: { isCaught: false } }, { ...state, loading: false });
  }),
  on(PokemonActions.releasePokemonFailure, (state, { error }) => {
    return { ...state, loading: false, error };
  })
);
