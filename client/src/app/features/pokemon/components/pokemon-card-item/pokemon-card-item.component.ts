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
  @Output() togglePokemon: EventEmitter<Pokemon> = new EventEmitter();

  public onTogglePokemon(pokemon: Pokemon): void {
    this.togglePokemon.emit(pokemon);
  }
}
