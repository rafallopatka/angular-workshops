import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';

import * as PostsActions from '../actions/posts.actions';
import { ApiClientService } from '../../app/services/api-client.service';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      concatMap((action) =>
        this.apiClient.getPostsList(action.searchPhrase).pipe(
          map((data) => PostsActions.loadPostSuccess({ data })),
          catchError((error) => of(PostsActions.loadPostsFailure({ error })))
        )
      )
    );
  });

  loadPostDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.loadPostDetails),
      concatMap((action) =>
        forkJoin({
          post: this.apiClient.getPost(action.postId),
          comments: this.apiClient.getComments(action.postId),
        }).pipe(
          map((data) => PostsActions.loadPostDetailsSuccess(data)),
          catchError((error) =>
            of(PostsActions.loadPostDetailsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(private actions$: Actions, private apiClient: ApiClientService) {}
}
