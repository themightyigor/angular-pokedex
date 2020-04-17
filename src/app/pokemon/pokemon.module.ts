import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from '../shared/directives/highlight/highlight.directive';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [HighlightDirective, PokemonsComponent, PokemonCardComponent, PokemonListComponent, SearchBarComponent],
  imports: [CommonModule],
  exports: [PokemonsComponent],
})
export class PokemonModule {}
