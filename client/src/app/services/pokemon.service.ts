import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemons: Observable<Pokemon[]>;

  constructor(private http: HttpClient, @Inject('API_URL') private baseUrl: string) {}

  getPokemons(term?: string): Observable<Pokemon[]> {
    const url = `${this.baseUrl}/pokemons`;
    let params = new HttpParams();
    params = term ? params.set('pokemon', `${term}`) : params;

    return this.http.get<Pokemon[]>(url, { params });
  }

  getPokemonById(id: string): Observable<Pokemon> {
    const url = `${this.baseUrl}/pokemons/${id}`;

    return this.http.get<Pokemon>(url);
  }

  updatePokemon(updatedPokemon: Pokemon): Observable<any> {
    const url = `${this.baseUrl}/pokemons/update/${updatedPokemon._id}`;

    return this.http.put(url, updatedPokemon);
  }

  togglePokemon(id: string, isCaught: { isCaught: boolean }): Observable<any> {
    const url = `${this.baseUrl}/pokemons/toggle/${id}`;

    return this.http.patch(url, isCaught);
  }
}
