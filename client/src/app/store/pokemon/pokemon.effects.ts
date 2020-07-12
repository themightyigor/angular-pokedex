import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { tap, map, mergeMap } from 'rxjs/operators';
import * as PokemonActionTypes from './pokemon.actions';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Injectable()
export class PokemonEffect {
  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.loadPokemons),
      mergeMap(() =>
        this.pokemonService
          .getPokemons()
          .pipe(map((pokemons: Pokemon[]) => PokemonActionTypes.loadPokemonsSuccess({ pokemons })))
      )
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.searchPokemon),
      mergeMap(({ term }) => {
        return this.pokemonService
          .getPokemons(term)
          .pipe(map((pokemons: Pokemon[]) => PokemonActionTypes.searchPokemonSuccess({ pokemons })));
      })
    )
  );

  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.loadPokemon),
      mergeMap(({ id }) => {
        return this.pokemonService
          .getPokemonById(id)
          .pipe(map((pokemon: Pokemon) => PokemonActionTypes.loadPokemonSuccess({ pokemon })));
      })
    )
  );

  catchPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.catchPokemon),
      mergeMap(({ id }) => {
        return this.pokemonService.catchPokemon(id).pipe(map(() => PokemonActionTypes.catchPokemonSuccess({ id })));
      })
    )
  );

  releasePokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.releasePokemon),
      mergeMap(({ id }) => {
        return this.pokemonService.releasePokemon(id).pipe(map(() => PokemonActionTypes.releasePokemonSuccess({ id })));
      })
    )
  );

  updatePokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.updatePokemon),
      tap(({ updatedPokemon }) => {
        this.notifierService.notify('success', 'Success!');
        this.router.navigate(['pokemons', updatedPokemon._id]);
      }),
      mergeMap(({ updatedPokemon }) => {
        return this.pokemonService
          .updatePokemon(updatedPokemon)
          .pipe(map(() => PokemonActionTypes.updatePokemonSuccess({ updatedPokemon })));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private notifierService: NotifierService,
    private router: Router
  ) {}
}
