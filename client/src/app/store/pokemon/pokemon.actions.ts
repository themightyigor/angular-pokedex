import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../../models/pokemon.model';

export const loadPokemons = createAction('[Pokemon Page] Load Pokemons');

export const loadPokemonsSuccess = createAction(
  '[Pokemon API] Load Pokemons Success',
  props<{ pokemons: Pokemon[] }>()
);

export const loadPokemonsFailure = createAction('[Pokemon API] Load Pokemons Failure', props<{ error: any }>());

export const catchPokemon = createAction('[Pokemon Page] Catch Pokemon', props<{ id: string }>());

export const catchPokemonSuccess = createAction('[Pokemon API] Catch Pokemon Success', props<{ id: string }>());

export const catchPokemonFailure = createAction('[Pokemon API] Catch Pokemon Failure', props<{ error: any }>());

export const releasePokemon = createAction('[Pokemon Page] Release Pokemon', props<{ id: string }>());

export const releasePokemonSuccess = createAction('[Pokemon API] Release Pokemon Success', props<{ id: string }>());

export const releasePokemonFailure = createAction('[Pokemon API] Release Pokemon Failure', props<{ error: any }>());

export const searchPokemon = createAction('[Pokemon Page] Search Pokemon', props<{ term: string }>());

export const searchPokemonSuccess = createAction(
  '[Pokemon API] Search Pokemon Success',
  props<{ pokemons: Pokemon[] }>()
);

export const searchPokemonFailure = createAction('[Pokemon API] Search Pokemon Failure', props<{ error: any }>());

export const loadPokemon = createAction('[Pokemon Page] Load Pokemon', props<{ id: string }>());

export const loadPokemonSuccess = createAction('[Pokemon API] Load Pokemon Success', props<{ pokemon: Pokemon }>());

export const loadPokemonFailure = createAction('[Pokemon API] Load Pokemon Failure', props<{ error: any }>());

export const updatePokemon = createAction('[Pokemon Page] Update Pokemon', props<{ pokemon: Pokemon }>());

export const updatePokemonSuccess = createAction(
  '[Pokemon API] Update Pokemon Success',
  props<{ pokemon: Pokemon }>()
);

export const updatePokemonFailure = createAction('[Pokemon Page] Update Pokemon Failure', props<{ error: any }>());

export const showEditDialog = createAction('[Pokemon Page] Show Edit Dialog', props<{ pokemon: Pokemon }>());
