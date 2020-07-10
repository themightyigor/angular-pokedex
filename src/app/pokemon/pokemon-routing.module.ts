import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  {
    path: 'pokemons',
    component: PokemonsComponent,
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
