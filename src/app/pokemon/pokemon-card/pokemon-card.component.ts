import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
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
