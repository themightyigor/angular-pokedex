import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureName, adapter, State } from './pokemon.state';

const getPokemonState = createFeatureSelector<State>(featureName);
const { selectAll, selectEntities } = adapter.getSelectors();

export const getLoading = createSelector(getPokemonState, (state) => state.loading);

export const getError = createSelector(getPokemonState, (state) => state.error);

export const getSelectedId = createSelector(getPokemonState, (state) => state.selectedId);

export const getPokemons = createSelector(getPokemonState, selectAll);

export const getPokemonEntities = createSelector(getPokemonState, selectEntities);

export const getPokemon = createSelector(getSelectedId, getPokemonEntities, (id, entities) =>
  id ? entities[id] : undefined
);
