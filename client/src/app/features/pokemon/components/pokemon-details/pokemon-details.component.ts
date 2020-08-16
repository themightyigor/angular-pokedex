import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Pokemon } from '../../../../models/pokemon.model';
import * as PokemonActions from 'src/app/store/pokemon/pokemon.actions';
import * as PokemonSelectors from 'src/app/store/pokemon/pokemon.selectors';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailsComponent implements OnInit {
  pokemon$ = this.store.pipe(select(PokemonSelectors.getPokemon));

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.store.dispatch(PokemonActions.loadPokemon({ id }));
    });
  }

  public togglePokemon(pokemon: Pokemon): void {
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
