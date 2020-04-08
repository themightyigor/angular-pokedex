import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pokemon } from '../../models/Pokemon';
import { POKEMONS } from '../../mock-pokemons';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemons = POKEMONS;

  constructor() {}

  filter(term: string): Pokemon[] {
    if (!term) {
      return this.pokemons;
    }

    return this.pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(term.toLowerCase()));
  }

  getPokemons(): Observable<Pokemon[]> {
    return of(this.pokemons);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.getPokemons().pipe(map((pokemons) => pokemons.find((pokemon) => pokemon.id === id)));
  }
}
