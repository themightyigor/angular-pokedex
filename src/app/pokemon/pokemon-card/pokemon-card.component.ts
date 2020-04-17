import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
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
  @Output() togglePokemon: EventEmitter<Pokemon> = new EventEmitter();

  isCaught: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pokemon) {
      this.isCaught = this.caughtIds.includes(this.pokemon.id);
    }
  }

  public onTogglePokemon(pokemon: Pokemon): void {
    this.togglePokemon.emit(pokemon);
    this.isCaught = !this.isCaught;
  }
}
