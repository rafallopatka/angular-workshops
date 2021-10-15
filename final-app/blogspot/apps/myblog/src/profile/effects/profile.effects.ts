import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ProfileActions from '../actions/profile.actions';
import { ApiClientService } from '../../app/services/api-client.service';

@Injectable()
export class ProfileEffects {
  loadProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.loadProfile),
      concatMap(() =>
      this.apiClient.getProfile()
        .pipe(
          map((data) => ProfileActions.loadProfileSuccess({ data })),
          catchError((error) =>
            of(ProfileActions.loadProfileFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private actions$: Actions, private apiClient: ApiClientService) {}
}
