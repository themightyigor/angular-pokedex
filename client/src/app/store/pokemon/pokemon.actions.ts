import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../../models/pokemon.model';

export const loadPokemons = createAction('[Pokemon] Load Pokemons');

export const loadPokemonsSuccess = createAction('[Pokemon] Load Pokemons Success', props<{ pokemons: Pokemon[] }>());

export const catchPokemon = createAction('[Pokemon] Catch Pokemon', props<{ id: string }>());

export const catchSelectedPokemon = createAction('[Pokemon] Catch Selected Pokemon', props<{ id: string }>());

export const catchPokemonSuccess = createAction('[Pokemon] Catch Pokemon Success', props<{ id: string }>());

export const catchSelectedPokemonSuccess = createAction('[Pokemon] Catch Selected Pokemon Success');

export const releasePokemon = createAction('[Pokemon] Release Pokemon', props<{ id: string }>());

export const releasePokemonSuccess = createAction('[Pokemon] Release Pokemon Success', props<{ id: string }>());

export const releaseSelectedPokemon = createAction('[Pokemon] Release Selected Pokemon', props<{ id: string }>());

export const releaseSelectedPokemonSuccess = createAction('[Pokemon] Release Selected Pokemon Success');

export const searchPokemon = createAction('[Pokemon] Search Pokemon', props<{ term: string }>());

export const searchPokemonSuccess = createAction('[Pokemon] Search Pokemon Success', props<{ pokemons: Pokemon[] }>());

export const getPokemon = createAction('[Pokemon] Get Pokemon', props<{ id: string }>());

export const getPokemonSuccess = createAction('[Pokemon] Get Pokemon Success', props<{ pokemon: Pokemon }>());

export const updatePokemon = createAction('[Pokemon] Update Pokemon', props<{ id: string; updatedPokemon: Pokemon }>());

export const updatePokemonSuccess = createAction(
  '[Pokemon] Update Pokemon Success',
  props<{ id: string; updatedPokemon: Pokemon }>()
);