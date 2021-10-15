import { createAction, props } from '@ngrx/store';
import { Post, PostListItem, Comment } from '../models';

export const loadPosts = createAction(
  '[Posts] Load Posts', props<{
    searchPhrase: string
  }>()
);

export const loadPostSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ data: PostListItem[] }>()
);

export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: any }>()
);

export const loadPostDetails = createAction(
  '[Posts] Load Post Details', props<{
    postId: number
  }>()
);

export const loadPostDetailsSuccess = createAction(
  '[Posts] Load Post Details Success',
  props<{ post: Post, comments: Comment[] }>()
);

export const loadPostDetailsFailure = createAction(
  '[Posts] Load Post Details Failure',
  props<{ error: any }>()
);
