import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Pokemon } from '../../../models/pokemon.model';
import { togglePokemon, getPokemon } from '../../../store/pokemon/pokemon.actions';
import { selectPokemon } from '../../../store/pokemon/pokemon.selectors';
import { State } from '../../../store/index';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailsComponent implements OnInit {
  public pokemon$: Observable<Pokemon>;

  constructor(private route: ActivatedRoute, private store: Store<State>) {
    this.pokemon$ = store.pipe(select(selectPokemon));
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.store.dispatch(getPokemon({ id }));
    });
  }

  public togglePokemon(pokemon: Pokemon): void {
    const { id, name, isCaught } = pokemon;
    this.store.dispatch(togglePokemon({ id }));
    console.log(`${name} has been ${isCaught ? 'released' : 'caught'}`);
  }
}
