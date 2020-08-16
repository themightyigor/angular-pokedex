import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { fromEvent, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Pokemon } from 'src/app/models/pokemon.model';
import * as PokemonActions from 'src/app/store/pokemon/pokemon.actions';
import * as PokemonSelectors from 'src/app/store/pokemon/pokemon.selectors';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit, OnDestroy {
  pokemons$ = this.store.pipe(select(PokemonSelectors.getPokemons));
  searchSubscription: Subscription;

  @ViewChild('inputElement', { static: true }) inputElement: ElementRef;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(PokemonActions.loadPokemons());
    this.subscribeToSearch();
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  subscribeToSearch() {
    this.searchSubscription = fromEvent<KeyboardEvent>(this.inputElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(() => this.inputElement.nativeElement.value)
      )
      .subscribe((term: string) => {
        this.store.dispatch(PokemonActions.searchPokemon({ term }));
      });
  }

  togglePokemon(pokemon: Pokemon) {
    const { id, captured } = pokemon;
    if (captured) {
      this.store.dispatch(PokemonActions.releasePokemon({ id }));
      return;
    }
    this.store.dispatch(PokemonActions.catchPokemon({ id }));
  }

  showEditDialog(pokemon: Pokemon) {
    this.store.dispatch(PokemonActions.showEditDialog({ pokemon }));
  }
}
