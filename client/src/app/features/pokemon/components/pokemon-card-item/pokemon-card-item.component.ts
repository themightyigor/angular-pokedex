import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card-item',
  templateUrl: './pokemon-card-item.component.html',
  styleUrls: ['./pokemon-card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardItemComponent {
  @Input() pokemon: Pokemon;
  @Output() togglePokemon = new EventEmitter<Pokemon>();
  @Output() updatePokemon = new EventEmitter<Pokemon>();
}
