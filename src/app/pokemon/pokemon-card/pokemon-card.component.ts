import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Pokemon } from '../../models/Pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent implements OnChanges {
  @Input() pokemon: Pokemon;
  @Input() caughtIds: Array<number>;
  @Output() catchPokemon: EventEmitter<Pokemon> = new EventEmitter();
  @Output() releasePokemon: EventEmitter<Pokemon> = new EventEmitter();

  caught: boolean;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.caughtIds) {
      this.caught = this.caughtIds.includes(this.pokemon.id);
    }
  }

  public onCatchPokemon(pokemon: Pokemon): void {
    this.catchPokemon.emit(pokemon);
  }

  public onReleasePokemon(pokemon: Pokemon): void {
    this.releasePokemon.emit(pokemon);
  }
}
