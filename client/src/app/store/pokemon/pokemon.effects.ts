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

  getPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.getPokemon),
      mergeMap(({ id }) => {
        return this.pokemonService
          .getPokemonById(id)
          .pipe(map((pokemon: Pokemon) => PokemonActionTypes.getPokemonSuccess({ pokemon })));
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

  catchSelectedPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.catchSelectedPokemon),
      mergeMap(({ id }) => {
        return this.pokemonService.catchPokemon(id).pipe(map(() => PokemonActionTypes.catchSelectedPokemonSuccess()));
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

  releaseSelectedPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.releaseSelectedPokemon),
      mergeMap(({ id }) => {
        return this.pokemonService
          .releasePokemon(id)
          .pipe(map(() => PokemonActionTypes.releaseSelectedPokemonSuccess()));
      })
    )
  );

  updatePokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.updatePokemon),
      tap(({ id }) => {
        this.notifierService.notify('success', 'Success!');
        this.router.navigate(['pokemons', id]);
      }),
      mergeMap(({ id, updatedPokemon }) => {
        return this.pokemonService
          .updatePokemon(id, updatedPokemon)
          .pipe(map(() => PokemonActionTypes.updatePokemonSuccess({ id, updatedPokemon })));
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
