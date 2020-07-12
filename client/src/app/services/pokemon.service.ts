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

  updatePokemon(updatedPokemon: Partial<Pokemon>): Observable<any> {
    const url = `${this.baseUrl}/pokemons/update/${updatedPokemon._id}`;

    console.log(updatedPokemon);
    return this.http.put(url, updatedPokemon);
  }

  catchPokemon(id: string): Observable<any> {
    const url = `${this.baseUrl}/pokemons/catch/${id}`;

    return this.http.patch(url, {});
  }

  releasePokemon(id: string): Observable<any> {
    const url = `${this.baseUrl}/pokemons/release/${id}`;

    return this.http.patch(url, {});
  }
}
