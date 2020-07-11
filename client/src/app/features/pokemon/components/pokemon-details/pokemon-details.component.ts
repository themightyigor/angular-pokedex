import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Pokemon } from '../../../../models/pokemon.model';
import { catchSelectedPokemon, getPokemon, releaseSelectedPokemon } from 'src/app/store/pokemon/pokemon.actions';
import { selectPokemon } from 'src/app/store/pokemon/pokemon.selectors';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailsComponent implements OnInit {
  pokemon$ = this.store.pipe(select(selectPokemon));

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.store.dispatch(getPokemon({ id }));
    });
  }

  public togglePokemon(pokemon: Pokemon): void {
    const { _id: id, isCaught } = pokemon;
    if (isCaught) {
      this.store.dispatch(releaseSelectedPokemon({ id }));
      return;
    }
    this.store.dispatch(catchSelectedPokemon({ id }));
  }
}
