import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, concatMap, switchMap, catchError } from 'rxjs/operators';
import * as PokemonActionTypes from './pokemon.actions';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonEditDialogComponent } from 'src/app/features/pokemon/components/';

@Injectable()
export class PokemonEffect {
  editDialogRef: MatDialogRef<PokemonEditDialogComponent>;

  constructor(private actions$: Actions, private dialog: MatDialog, private pokemonService: PokemonService) {}

  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.loadPokemons),
      switchMap(() =>
        this.pokemonService.getPokemons().pipe(
          map((pokemons: Pokemon[]) => PokemonActionTypes.loadPokemonsSuccess({ pokemons })),
          catchError((error) => of(PokemonActionTypes.loadPokemonsFailure({ error })))
        )
      )
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.searchPokemon),
      switchMap(({ term }) => {
        return this.pokemonService.getPokemons(term).pipe(
          map((pokemons: Pokemon[]) => PokemonActionTypes.searchPokemonSuccess({ pokemons })),
          catchError((error) => of(PokemonActionTypes.searchPokemonFailure({ error })))
        );
      })
    )
  );

  loadPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.loadPokemon),
      concatMap(({ id }) => {
        return this.pokemonService.getPokemonById(id).pipe(
          map((pokemon: Pokemon) => PokemonActionTypes.loadPokemonSuccess({ pokemon })),
          catchError((error) => of(PokemonActionTypes.loadPokemonFailure({ error })))
        );
      })
    )
  );

  catchPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.catchPokemon),
      concatMap(({ id }) => {
        return this.pokemonService.togglePokemonStatus(id).pipe(
          map(() => PokemonActionTypes.catchPokemonSuccess({ id })),
          catchError((error) => of(PokemonActionTypes.catchPokemonFailure({ error })))
        );
      })
    )
  );

  releasePokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.releasePokemon),
      concatMap(({ id }) => {
        return this.pokemonService.togglePokemonStatus(id).pipe(
          map(() => PokemonActionTypes.releasePokemonSuccess({ id })),
          catchError((error) => of(PokemonActionTypes.releasePokemonFailure({ error })))
        );
      })
    )
  );

  updatePokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActionTypes.updatePokemon),
      concatMap(({ pokemon }) => {
        return this.pokemonService.updatePokemon(pokemon).pipe(
          map(() => PokemonActionTypes.updatePokemonSuccess({ pokemon })),
          catchError((error) => of(PokemonActionTypes.updatePokemonFailure({ error })))
        );
      })
    )
  );

  showEditDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PokemonActionTypes.showEditDialog),
        tap(({ pokemon }) => {
          this.editDialogRef = this.dialog.open(PokemonEditDialogComponent, {
            width: '400px',
            data: { pokemon },
          });
        })
      ),
    { dispatch: false }
  );

  hideEditDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PokemonActionTypes.updatePokemonSuccess),
        tap(() => {
          this.editDialogRef.close();
        })
      ),
    { dispatch: false }
  );
}
