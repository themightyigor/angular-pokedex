import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Pokemon } from 'src/app/models/pokemon.model';
import * as PokemonActions from 'src/app/store/pokemon/pokemon.actions';
import * as PokemonSelectors from 'src/app/store/pokemon/pokemon.selectors';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemons$ = this.store.pipe(select(PokemonSelectors.getPokemons));

  public isShowList = false;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((queryParams) => {
      const term = queryParams.get('pokemon');
      if (term) {
        this.store.dispatch(PokemonActions.searchPokemon({ term }));
        return;
      }
      this.store.dispatch(PokemonActions.loadPokemons());
    });
  }

  public showList(): void {
    this.isShowList = !this.isShowList;
  }

  public togglePokemon(pokemon: Pokemon): void {
    const { _id: id, isCaught } = pokemon;
    if (isCaught) {
      this.store.dispatch(PokemonActions.releasePokemon({ id }));
      return;
    }
    this.store.dispatch(PokemonActions.catchPokemon({ id }));
  }

  public search(term: string): void {
    this.router.navigate([], { queryParams: term ? { pokemon: term } : null });
  }
}
