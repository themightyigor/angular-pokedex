import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonEditComponent } from './components/pokemon-edit/pokemon-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PokemonsComponent,
  },
  {
    path: ':id',
    component: PokemonDetailsComponent,
  },
  {
    path: 'edit/:id',
    component: PokemonEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
