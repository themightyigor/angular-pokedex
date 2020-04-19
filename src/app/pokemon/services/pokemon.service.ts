import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pokemon } from '../../models/pokemon.model';
import { POKEMONS } from '../../mock-pokemons';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemons = POKEMONS;

  constructor() {}

  filter(term: string): Pokemon[] {
    return this.pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(term.toLowerCase()));
  }

  getPokemons(): Observable<Pokemon[]> {
    return of(this.pokemons);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return of(this.pokemons).pipe(map((pokemons) => pokemons.find((pokemon) => pokemon.id === id)));
  }

  updatePokemon(id: number, updatedPokemon: Pokemon): void {
    this.pokemons = this.pokemons.map((pokemon) => (pokemon.id === id ? { ...pokemon, ...updatedPokemon } : pokemon));
  }
}
