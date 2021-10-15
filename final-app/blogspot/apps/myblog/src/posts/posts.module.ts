import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { CONTAINERS } from './containers';
import { COMPONENTS } from './components';
import { MATERIALS } from '../app/components';
import { StoreModule } from '@ngrx/store';
import * as fromPosts from './reducers/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './effects/posts.effects';

@NgModule({
  declarations: [
    ...CONTAINERS,
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ...MATERIALS,
    StoreModule.forFeature(fromPosts.postsFeatureKey, fromPosts.reducer),
    EffectsModule.forFeature([PostsEffects])
  ]
})
export class PostsModule { }
