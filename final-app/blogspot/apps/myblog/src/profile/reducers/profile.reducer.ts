import { Action, createReducer, on } from '@ngrx/store';
import * as ProfileActions from '../actions/profile.actions';
import { UserProfile } from '../models';

export const profileFeatureKey = 'profile';

export interface State {
  userProfile?: UserProfile;
}

export const initialState: State = {};

export const reducer = createReducer(
  initialState,

  on(ProfileActions.loadProfile, (state) => state),
  on(ProfileActions.loadProfileSuccess, (state, action) => ({
    ...state,
    userProfile: action.data,
  })),
  on(ProfileActions.loadProfileFailure, (state, action) => state)
);
