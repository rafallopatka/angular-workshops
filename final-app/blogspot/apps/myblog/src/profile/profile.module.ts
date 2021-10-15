import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { CONTAINERS } from '../profile/containers';
import { COMPONENTS } from './components';
import { MATERIALS } from '../app/components';
import { StoreModule } from '@ngrx/store';
import * as fromProfile from './reducers/profile.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './effects/profile.effects';


@NgModule({
  declarations: [
    ...CONTAINERS,
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MATERIALS,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
    EffectsModule.forFeature([ProfileEffects])
  ]
})
export class ProfileModule { }
