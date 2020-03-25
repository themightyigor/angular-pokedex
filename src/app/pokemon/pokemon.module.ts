import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';


@NgModule({
  declarations: [PokemonsComponent, PokemonCardComponent],
  imports: [
    CommonModule
  ],
  exports: [PokemonsComponent]
})
export class PokemonModule { }
