import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
  @Input() pokemon: Pokemon;
  @Input() caught: boolean;
  @Output() catchPokemon: EventEmitter<Pokemon> = new EventEmitter();
  @Output() releasePokemon: EventEmitter<Pokemon> = new EventEmitter();

  constructor() {}

  public onCatchPokemon(pokemon: Pokemon): void {
    this.catchPokemon.emit(pokemon);
  }

  public onReleasePokemon(pokemon: Pokemon): void {
    this.releasePokemon.emit(pokemon);
  }
}
