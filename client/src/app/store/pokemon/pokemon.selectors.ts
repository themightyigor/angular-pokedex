import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PokemonState } from './pokemon.reducer';

export const selectPokemonState = createFeatureSelector<PokemonState>('pokemon');

export const selectAllPokemons = createSelector(selectPokemonState, (state) => state.pokemons);

export const selectPokemon = createSelector(selectPokemonState, (state) => state.selectedPokemon);
