import { Action, createReducer } from '@ngrx/store';
import * as PokemonActions from './pokemon.actions';
import { Pokemon } from '../../models/pokemon.model';
import { produceOn } from '../immer';

export interface PokemonState {
  pokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
}

const initialState: PokemonState = {
  pokemons: [],
  selectedPokemon: null,
};

export const featureName = 'pokemon';

export const reducer = createReducer(
  initialState,
  produceOn(PokemonActions.loadPokemonsSuccess, (draft, action) => {
    draft.pokemons = action.pokemons;
  }),
  produceOn(PokemonActions.catchPokemonSuccess, (draft, action) => {
    const pokemon = draft.pokemons.find((item) => item._id === action.id);
    pokemon.isCaught = true;
  }),
  produceOn(PokemonActions.catchSelectedPokemonSuccess, (draft, action) => {
    draft.selectedPokemon.isCaught = true;
  }),
  produceOn(PokemonActions.releasePokemonSuccess, (draft, action) => {
    const pokemon = draft.pokemons.find((item) => item._id === action.id);
    pokemon.isCaught = false;
  }),
  produceOn(PokemonActions.releaseSelectedPokemonSuccess, (draft, action) => {
    draft.selectedPokemon.isCaught = false;
  }),
  produceOn(PokemonActions.searchPokemonSuccess, (draft, action) => {
    draft.pokemons = action.pokemons;
  }),
  produceOn(PokemonActions.getPokemonSuccess, (draft, action) => {
    draft.selectedPokemon = action.pokemon;
  }),
  produceOn(PokemonActions.updatePokemonSuccess, (draft, action) => {
    const pokemonToUpdate = draft.pokemons.find((item) => item._id === action.id);
    Object.assign(pokemonToUpdate, action.updatedPokemon);
  })
);
