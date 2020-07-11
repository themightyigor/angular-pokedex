import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { featureName } from 'src/app/store/pokemon/pokemon.reducer';
import { reducer } from 'src/app/store/pokemon/pokemon.reducer';
import { PokemonEffect } from 'src/app/store/pokemon/pokemon.effects';
@NgModule({
  imports: [StoreModule.forFeature(featureName, reducer), EffectsModule.forFeature([PokemonEffect])],
})
export class PokemonStoreModule {}
