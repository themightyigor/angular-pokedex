import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Pokemon } from '../../../models/pokemon.model';
import { searchPokemon, togglePokemon } from '../../../store/pokemon/pokemon.actions';
import { selectAllPokemons, selectSearchedPokemons } from '../../../store/pokemon/pokemon.selectors';
import { State } from '../../../store/';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemons$: Observable<Pokemon[]>;
  public isShowList = false;
  public isSearchMode: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<State>) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((queryParams) => {
      const term = queryParams.get('pokemon');
      if (term) {
        this.store.dispatch(searchPokemon({ term }));
        this.pokemons$ = this.store.select(selectSearchedPokemons);
        this.isSearchMode = true;
        return;
      }
      this.isSearchMode = false;
      this.pokemons$ = this.store.select(selectAllPokemons);
    });
  }

  public showList(): void {
    this.isShowList = !this.isShowList;
  }

  public togglePokemon(pokemon: Pokemon): void {
    const { id, name, isCaught } = pokemon;
    this.store.dispatch(togglePokemon({ id }));
    console.log(`${name} has been ${isCaught ? 'released' : 'caught'}`);
  }

  public search(term: string): void {
    this.router.navigate([], { queryParams: term ? { pokemon: term } : null });
  }
}
