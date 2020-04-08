import { Injectable } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class CaughtService {
  private caughtIds: Array<number> = [];

  constructor() {}

  public catchPokemon(pokemon: Pokemon): void {
    this.caughtIds = [...this.caughtIds, pokemon.id];
    console.log(`${pokemon.name} has been caught`);
  }

  public releasePokemon(pokemon: Pokemon): void {
    this.caughtIds = this.caughtIds.filter((id) => id !== pokemon.id);
    console.log(`${pokemon.name} has been released`);
  }

  public isCaught(id: number): boolean {
    return this.caughtIds.includes(id);
  }
}
