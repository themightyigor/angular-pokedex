import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonStoreModule } from './pokemon-store.module';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonCardItemComponent } from './components/pokemon-card-item/pokemon-card-item.component';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PokemonEditComponent } from './components/pokemon-edit/pokemon-edit.component';

@NgModule({
  declarations: [
    HighlightDirective,
    PokemonsComponent,
    PokemonDetailsComponent,
    PokemonCardItemComponent,
    PokemonListItemComponent,
    SearchBarComponent,
    PokemonEditComponent,
  ],
  imports: [CommonModule, PokemonRoutingModule, PokemonStoreModule, FormsModule, ReactiveFormsModule],
  exports: [PokemonsComponent],
})
export class PokemonModule {}
