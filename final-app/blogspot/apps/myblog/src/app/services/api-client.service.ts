import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Comment, Post, PostListItem } from '../../posts/models';
import { UserProfile } from '../../profile/models';
import { db } from './db';
@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  getProfile(): Observable<UserProfile> {
    return of({
      id: 1,
      name: 'Leanne Graham',
      email: 'leanne.graham@contoso.com',
      phone: '(775)976-6794-206',
      photoUrl: 'https://picsum.photos/500',
    } as UserProfile).pipe(delay(500));
  }

  getPostsList(searchPhrase: string): Observable<Array<PostListItem>> {
    let posts = db.posts;

    if (searchPhrase) {
      posts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchPhrase.toLowerCase())
      );
    }

    const results = posts.map(
      (post) =>
        ({
          id: post.id,
          authorId: post.userId,
          title: post.title,
          author: db.users.find((user) => user.id == post.userId)?.username,
        } as PostListItem)
    );
    return of(results).pipe(delay(700));
  }

  getPost(id: number): Observable<Post> {
    const post = db.posts.find((post) => post.id === id);
    const userName = db.users.find((user) => user.id == post?.userId)?.username;

    return of({
      id: post?.id,
      authorId: post?.userId,
      body: post?.body,
      title: post?.title,
      author: userName,
    } as Post).pipe(delay(400));
  }

  getComments(postId: number): Observable<Comment[]> {
    const comments: Comment[] = db.comments.filter((comment) => comment.postId === postId);

    return of(comments).pipe(delay(1000));
  }
}
