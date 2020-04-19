import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pokemon } from '../../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailsComponent implements OnInit {
  public pokemon: Pokemon;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.getPokemon(id);
    });
  }

  getPokemon(id: number): void {
    this.pokemonService.getPokemonById(id).subscribe((pokemon) => {
      this.pokemon = pokemon;
    });
  }

  public togglePokemon(): void {
    this.pokemon.isCaught = !this.pokemon.isCaught;
    console.log(`${this.pokemon.name} has been ${this.pokemon.isCaught ? 'caught' : 'released'}`);
  }
}
