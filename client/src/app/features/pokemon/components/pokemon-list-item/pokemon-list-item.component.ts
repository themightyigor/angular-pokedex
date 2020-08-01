import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListItemComponent {
  @Input() pokemon: Pokemon;
  @Output() togglePokemon: EventEmitter<Pokemon> = new EventEmitter();

  public onTogglePokemon(pokemon: Pokemon): void {
    this.togglePokemon.emit(pokemon);
  }
}
