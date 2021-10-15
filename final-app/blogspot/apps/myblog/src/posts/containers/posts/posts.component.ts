import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostListItem } from '../../models';
import * as PostActions from '../../actions/posts.actions';
import * as PostSelectors from '../../selectors/posts.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'blogspot-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts$: Observable<Array<PostListItem>>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(PostSelectors.selectPostsListLoading);
    this.posts$ = this.store.select(PostSelectors.selectPostsListItems);
  }
  ngOnInit() {
    this.store.dispatch(PostActions.loadPosts({
      searchPhrase: ''
    }))
  }

  onSearch(searchPhrase: string) {
    this.store.dispatch(PostActions.loadPosts({
      searchPhrase
    }))
  }
}
