import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Pokemon } from 'src/app/models/pokemon.model';
import { loadPokemons, searchPokemon, catchPokemon, releasePokemon } from 'src/app/store/pokemon/pokemon.actions';
import { selectAllPokemons } from 'src/app/store/pokemon/pokemon.selectors';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemons$ = this.store.pipe(select(selectAllPokemons));

  public isShowList = false;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((queryParams) => {
      const term = queryParams.get('pokemon');
      if (term) {
        this.store.dispatch(searchPokemon({ term }));
        return;
      }
      this.store.dispatch(loadPokemons());
    });
  }

  public showList(): void {
    this.isShowList = !this.isShowList;
  }

  public togglePokemon(pokemon: Pokemon): void {
    const { _id, isCaught } = pokemon;
    if (isCaught) {
      this.store.dispatch(releasePokemon({ id: _id }));
      return;
    }
    this.store.dispatch(catchPokemon({ id: _id }));
  }

  public search(term: string): void {
    this.router.navigate([], { queryParams: term ? { pokemon: term } : null });
  }
}
