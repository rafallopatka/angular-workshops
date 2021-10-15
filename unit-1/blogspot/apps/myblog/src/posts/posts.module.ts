import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { CONTAINERS } from './containers';
import { COMPONENTS } from './components';

@NgModule({
  declarations: [
    ...CONTAINERS,
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
