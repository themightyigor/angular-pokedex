import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { tap, map, mergeMap } from 'rxjs/operators';
import * as PokemonActionTypes from './pokemon.actions';
import { PokemonService } from '../../pokemon/services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Injectable()
export class PokemonEffect {
  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
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
          .filter(term)
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

  updatePokemon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PokemonActionTypes.updatePokemon),
        tap(({ id }) => {
          this.notifierService.notify('success', 'Success!');
          this.router.navigate(['pokemon', id]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private notifierService: NotifierService,
    private router: Router
  ) {}
}
