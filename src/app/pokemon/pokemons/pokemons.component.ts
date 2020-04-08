import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/Pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  public isShowList = false;
  public pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getPokemons();
  }

  public showList(): void {
    this.isShowList = !this.isShowList;
  }

  private getPokemons() {
    this.pokemonService.getPokemons().subscribe((pokemons) => (this.pokemons = pokemons));
  }
}
