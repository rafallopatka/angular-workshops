import { Action, createReducer, on } from '@ngrx/store';
import * as PostsActions from '../actions/posts.actions';
import { Post, PostListItem, Comment } from '../models';

export const postsFeatureKey = 'posts';

export interface State {
  list: {
    loading: boolean;
    data: PostListItem[];
  };
  details?: {
    post: Post;
    comments: Comment[];
  };
}

export const initialState: State = {
  list: {
    loading: false,
    data: [],
  },
};

export const reducer = createReducer(
  initialState,

  on(PostsActions.loadPosts, (state) => ({
    ...state,
    list: {
      ...state.list,
      loading: true,
    },
  })),
  on(PostsActions.loadPostSuccess, (state, action) => ({
    ...state,
    list: {
      loading: false,
      data: action.data,
    },
  })),
  on(PostsActions.loadPostsFailure, (state) => ({
    ...state,
    list: {
      ...state.list,
      loading: false,
    },
  })),

  on(PostsActions.loadPostDetails, (state) => ({
    ...state,
    details: undefined,
  })),
  on(PostsActions.loadPostDetailsSuccess, (state, action) => ({
    ...state,
    details: {
      comments: action.comments,
      post: action.post,
    },
  })),
  on(PostsActions.loadPostDetailsFailure, (state) => ({
    ...state,
    details: undefined,
  }))
);
