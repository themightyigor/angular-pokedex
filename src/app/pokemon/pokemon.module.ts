import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PokemonEditComponent } from './components/pokemon-edit/pokemon-edit.component';

@NgModule({
  declarations: [
    HighlightDirective,
    PokemonsComponent,
    PokemonDetailsComponent,
    PokemonCardComponent,
    PokemonListComponent,
    SearchBarComponent,
    PokemonEditComponent,
  ],
  imports: [CommonModule, PokemonRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [PokemonsComponent],
})
export class PokemonModule {}
