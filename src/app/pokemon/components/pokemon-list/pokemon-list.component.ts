import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Pokemon } from '../../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
  @Input() pokemon: Pokemon;
  @Output() togglePokemon: EventEmitter<Pokemon> = new EventEmitter();

  public onTogglePokemon(pokemon: Pokemon): void {
    this.togglePokemon.emit(pokemon);
  }
}
