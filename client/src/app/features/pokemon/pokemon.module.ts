import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonStoreModule } from './pokemon-store.module';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import {
  PokemonsComponent,
  PokemonDetailsComponent,
  PokemonCardItemComponent,
  PokemonEditDialogComponent,
} from './components';

@NgModule({
  declarations: [
    HighlightDirective,
    PokemonsComponent,
    PokemonDetailsComponent,
    PokemonCardItemComponent,
    PokemonEditDialogComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, PokemonStoreModule, PokemonRoutingModule],
  exports: [PokemonsComponent],
})
export class PokemonModule {}
