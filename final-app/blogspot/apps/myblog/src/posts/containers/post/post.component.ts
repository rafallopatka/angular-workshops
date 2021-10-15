import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post, Comment } from '../../models';
import * as PostsActions from '../../actions/posts.actions';
import * as PostsSelectors from '../../selectors/posts.selectors';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'blogspot-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post$: Observable<Post>;
  comments$: Observable<Array<Comment>>;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.post$ = this.store
      .select(PostsSelectors.getPostDetails)
      .pipe(map((x) => x?.post!));
    this.comments$ = this.store
      .select(PostsSelectors.getPostDetails)
      .pipe(map((x) => x?.comments!));
  }
  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      map((param) => Number.parseInt(param!)),
      map(id => PostsActions.loadPostDetails({
        postId: id
      }))
    ).subscribe(this.store)
  }
}
