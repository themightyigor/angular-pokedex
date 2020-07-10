import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Pokemon } from '../../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  public isShowList = false;
  public pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((queryParams) => {
      const pokemonName = queryParams.get('pokemon');
      if (pokemonName) {
        this.pokemons = this.pokemonService.filter(pokemonName);
        return;
      }
      this.getPokemons();
    });
  }

  public showList(): void {
    this.isShowList = !this.isShowList;
  }

  private getPokemons() {
    this.pokemonService.getPokemons().subscribe((pokemons) => (this.pokemons = pokemons));
  }

  public togglePokemon(pokemon: Pokemon): void {
    pokemon.isCaught = !pokemon.isCaught;
    console.log(`${pokemon.name} has been ${pokemon.isCaught ? 'caught' : 'released'})`);
  }

  public search(term: string): void {
    this.router.navigate([], { queryParams: term ? { pokemon: term } : {} });
  }
}
