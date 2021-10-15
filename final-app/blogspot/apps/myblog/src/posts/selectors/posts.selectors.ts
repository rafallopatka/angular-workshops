import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPosts from '../reducers/posts.reducer';

export const selectPoststate = createFeatureSelector<fromPosts.State>(
  fromPosts.postsFeatureKey
);

export const selectPostsListItems = createSelector(selectPoststate, x => x.list.data);

export const selectPostsListLoading = createSelector(selectPoststate, x => x.list.loading)

export const getPostDetails = createSelector(selectPoststate, x => x.details)
