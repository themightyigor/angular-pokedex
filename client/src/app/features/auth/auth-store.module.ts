import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { featureName } from 'src/app/store/user/user.reducer';
import { reducer } from 'src/app/store/user/user.reducer';
import { UserEffects } from 'src/app/store/user/user.effects';

@NgModule({
  imports: [StoreModule.forFeature(featureName, reducer), EffectsModule.forFeature([UserEffects])],
})
export class AuthStoreModule {}
