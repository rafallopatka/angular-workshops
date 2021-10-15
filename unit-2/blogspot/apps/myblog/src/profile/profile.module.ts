import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { CONTAINERS } from '../profile/containers';
import { COMPONENTS } from './components';
import { MATERIALS } from '../app/components';


@NgModule({
  declarations: [
    ...CONTAINERS,
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MATERIALS
  ]
})
export class ProfileModule { }
