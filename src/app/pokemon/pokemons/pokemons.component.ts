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
  public caughtIds: Array<number> = [];

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

  public togglePokemon(pokemon: Pokemon) {
    if (this.isCaught(pokemon.id)) {
      this.caughtIds = this.caughtIds.filter((id) => id !== pokemon.id);
      console.log(`${pokemon.name} has been released`);
      return;
    }
    this.caughtIds = [...this.caughtIds, pokemon.id];
    console.log(`${pokemon.name} has been caught`);
  }

  private isCaught(id: number): boolean {
    return this.caughtIds.includes(id);
  }
}
