import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';
import { CaughtService } from '../services/caught.service';

@Component({
  selector: 'app-pokemon-button',
  templateUrl: './pokemon-button.component.html',
  styleUrls: ['./pokemon-button.component.scss'],
})
export class PokemonButtonComponent implements OnInit, OnChanges {
  @Input() pokemon: Pokemon;
  isCaught = false;

  constructor(private caughtService: CaughtService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.isCaught = this.caughtService.isCaught(this.pokemon.id);
    }
  }

  catchPokemon() {
    this.caughtService.catchPokemon(this.pokemon);
    this.isCaught = true;
  }

  releasePokemon() {
    this.caughtService.releasePokemon(this.pokemon);
    this.isCaught = false;
  }
}
