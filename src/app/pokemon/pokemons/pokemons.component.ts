import { Component } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';
import { POKEMONS } from '../../mock-pokemons';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent {
  isShowList = false;
  pokemons = POKEMONS;
  private caughtIds: Array<number> = [];

  constructor() {}

  public showList(): void {
    this.isShowList = !this.isShowList;
  }

  public isCaught(id: number): boolean {
    return this.caughtIds.includes(id);
  }

  public catchPokemon(pokemon: Pokemon): void {
    this.caughtIds = [...this.caughtIds, pokemon.id];
    console.log(`${pokemon.name} has been caught`);
  }

  public releasePokemon(pokemon: Pokemon): void {
    this.caughtIds = this.caughtIds.filter((id) => id !== pokemon.id);
    console.log(`${pokemon.name} has been released`);
  }
}
