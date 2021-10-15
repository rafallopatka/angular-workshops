import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../models';

export const loadProfile = createAction(
  '[Profile] Load Profile'
);

export const loadProfileSuccess = createAction(
  '[Profile] Load Profile Success',
  props<{ data: UserProfile }>()
);

export const loadProfileFailure = createAction(
  '[Profile] Load Profile Failure',
  props<{ error: any }>()
);
