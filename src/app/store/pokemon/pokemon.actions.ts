import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../../models/pokemon.model';

export const loadPokemons = createAction('[Pokemon] Load Pokemons');

export const loadPokemonsSuccess = createAction('[Pokemon] Load Pokemons Success', props<{ pokemons: Pokemon[] }>());

export const togglePokemon = createAction('[Pokemon] Toggle Pokemon', props<{ id: number }>());

export const searchPokemon = createAction('[Pokemon] Search Pokemon', props<{ term: string }>());

export const searchPokemonSuccess = createAction('[Pokemon] Search Pokemon Success', props<{ pokemons: Pokemon[] }>());

export const getPokemon = createAction('[Pokemon] Get Pokemon', props<{ id: number }>());

export const getPokemonSuccess = createAction('[Pokemon] Get Pokemon Success', props<{ pokemon: Pokemon }>());

export const updatePokemon = createAction('[Pokemon] Update Pokemon', props<{ id: number; updatedPokemon: Pokemon }>());
