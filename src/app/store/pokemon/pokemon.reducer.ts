import { Action, createReducer } from '@ngrx/store';
import * as PokemonActions from './pokemon.actions';
import { Pokemon } from '../../models/pokemon.model';
import { produceOn } from '../immer';

export interface PokemonState {
  pokemons: Pokemon[];
  selectedPokemonId?: number;
  searchedPokemons?: Pokemon[];
}

const initialState: PokemonState = {
  pokemons: [],
};

const reducer = createReducer(
  initialState,
  produceOn(PokemonActions.loadPokemonsSuccess, (draft, action) => {
    draft.pokemons = action.pokemons;
  }),
  produceOn(PokemonActions.togglePokemon, (draft, action) => {
    const pokemon = draft.pokemons.find((item) => item.id === action.id);
    pokemon.isCaught = !pokemon.isCaught;
  }),
  produceOn(PokemonActions.searchPokemonSuccess, (draft, action) => {
    draft.searchedPokemons = action.pokemons;
  }),
  produceOn(PokemonActions.getPokemonSuccess, (draft, action) => {
    draft.selectedPokemonId = action.pokemon.id;
  }),
  produceOn(PokemonActions.updatePokemon, (draft, action) => {
    const pokemonToUpdate = draft.pokemons.find((item) => item.id === action.id);
    Object.assign(pokemonToUpdate, action.updatedPokemon);
  })
);

export function pokemonReducer(state: PokemonState, action: Action): PokemonState {
  return reducer(state, action);
}
