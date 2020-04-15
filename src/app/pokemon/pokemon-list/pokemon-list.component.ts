import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Pokemon } from '../../models/Pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent implements OnChanges {
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
