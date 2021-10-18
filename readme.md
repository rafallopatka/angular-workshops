# Prerequisites:
- Git (+ GUI like GitExtensions)
- VS Code (+ extension Angular Essentials 12, ESLint, Jest Runner)
- NodeJs LTS
- ConEmu https://conemu.github.io (optional for better terminal)
- Angular CLI (npm install -g @angular/cli)
- Nx Dev CLI (npm install -g nx)
- Chrome extension https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en-US

# Unit 0 - Project structure, routing & lazy loading
-  terminal
- cd /unit-0
- npx create-nx-workspace --preset=angular (workspace: blogspot, name: myblog, css: SASS, use cloud: No)
- cd blogspot
- nx add @ngrx/schematics@latest
- npm start 
- http://localhost:4200
- Create app-routing.module.ts
``` ts 
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

```
- Register routing module
``` ts 
// src/app/app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```
- Generate posts module angular:module (name: posts, module: app, route: posts, routing: true)
- Generate profile module angular:module (name: profile, module: app, route: profile, routing: true)
- Organize components in containers directories
- Create index.ts in containers folder, export profile and posts components
``` ts 
// src/profile/containers/index.ts
import { ProfileComponent } from './profile/profile.component';

export * from './profile/profile.component';

export const CONTAINERS = [
  ProfileComponent
];
```
Import containers in matching angular modules.
``` ts 
// src/profile/profile.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { CONTAINERS } from '../profile/containers';

@NgModule({
  declarations: [
    ...CONTAINERS,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
```
- Replace app.component.html content with
``` html
<header>
  <nav>
    <a routerLink="/">Posts</a>
    <a routerLink="profile">Profile</a>
  </nav>
</header>
<section>
  <router-outlet></router-outlet>
</section>
```
- Remove content of app.component.scss
- Create profile/models/user-profile.model.ts
``` ts 
// src/profile/models/user-profile.model.ts
export interface UserProfile {
  id: number,
  name: string,
  email: string,
  phone: string,
  photoUrl: string
}
```
- Create profile/models/index.ts and export UserProfile
```ts
export * from './user-profile.model';
```
- Create posts/models/post-list-item.model.ts
``` ts 
// src/profile/models/post-list-item.model.ts
export interface PostListItem {
  id: number,
  title: string,
  author: string,
  authorId: number,
}
```
- Create posts/models/post.model.ts
``` ts 
// src/profile/models/post.model.ts
export interface Post {
  id: number,
  title: string,
  author: string,
  authorId: number,
  body: string
}
```

- Create posts/models/comment.model.ts
``` ts 
// src/profile/models/comment.model.ts
export interface Comment {
  id: number,
  postId: number,
  name: string,
  body: string,
  email: number
}
```
- Create posts/models/index.ts and export PostListItem, Post, Comment
```ts
export * from './post-list-item.model';
export * from './comment.model';
export * from './post.model';
```
- Generate component in profile/components (name: Vcard, style: scss, skip import: true) and import it by profile/components/index.ts and profile.module.ts 
- Update profile/components/index.ts
```ts
import { VcardComponent } from './vcard/vcard.component';

export * from './vcard/vcard.component';

export const COMPONENTS = [
  VcardComponent
];
```
- Generate component in posts/components (name: PostsGrid, style: scss, skip import: true) and import it by posts/components/index.ts and posts.module.ts 
- Generate component in posts/components (name: PostDisplay, style: scss, skip import: true) and import it by posts/components/index.ts and posts.module.ts 
- Generate component in posts/components (name: CommentsList, style: scss, skip import: true) and import it by posts/components/index.ts and posts.module.ts 
- Create posts/components/index.ts
```ts
import { CommentsListComponent } from "./comments-list/comments-list.component";
import { PostDisplayComponent } from "./post-display/post-display.component";
import { PostGridComponent } from "./post-grid/post-grid.component";

export * from "./comments-list/comments-list.component";
export * from "./post-display/post-display.component";
export * from "./post-grid/post-grid.component";

export const COMPONENTS = [
  CommentsListComponent,
  PostDisplayComponent,
  PostGridComponent
];
```
- Generate container in posts/containers (name: Post, style: scss, skip import: true) and import it by posts/containers/index.ts and posts.module.ts
```ts
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';

export * from './posts/posts.component';
export * from './post/post.component';

export const CONTAINERS = [
  PostsComponent,
  PostComponent
];
```
- Register PostComponent in posts-routing.module.ts
``` ts 
// src/posts/post-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent, PostComponent } from './containers';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: ':id', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
```
- Update AppRoutingModule
```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../posts/posts.module').then((m) => m.PostsModule),
  },

  {
    path: 'profile',
    loadChildren: () =>
      import('../profile/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

```

# Unit 1 - Angular Material, NxDatatable, SCSS + BEM
- terminal
- cd /unit-1/blogspot
- nx add @angular/material (theme: pink, typography: true, animations: true)
- npm i @swimlane/ngx-datatable --save
- create index file with all components for the app
``` ts
// src/app/components/index.ts
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

export const MATERIALS = [
  MatCardModule,
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule,
  NgxDatatableModule,
  FormsModule,
  ReactiveFormsModule,
];
```
- Import componetns in app.module, posts.module, profile.module
- Update style.scss
```scss
@import '~@swimlane/ngx-datatable/index.css';
@import '~@swimlane/ngx-datatable/themes/material.scss';
@import '~@swimlane/ngx-datatable/assets/icons.css';

html,
body {
  height: 100%;
}
body {
  margin: 0;
  font-family: Roboto, 'Helvetica Neue', sans-serif;
}

body {
  display: block;
  width: 60vw;
  margin: auto;
}
```
- Update app.component.html
``` html
<header class="header">
  <a routerLink="/">
    <img
      class="logo logo--rounded header__logo"
      src="https://material.angular.io/assets/img/examples/shiba2.jpg"
    />
  </a>

  <nav class="navigation">
    <a class="navigation__link" mat-button color="primary" routerLink="/"
      >Posts</a
    >
    <a class="navigation__link" mat-button color="accent" routerLink="profile"
      >Profile</a
    >
    <a class="navigation__link--dead" mat-button>Dead link</a>
  </nav>
</header>
<section class="content">
  <router-outlet></router-outlet>
</section>
```
- Update app.component.scss
``` scss
.logo {
  display: inline-block;
  border: 1px solid rgb(126, 126, 126);

  &--rounded {
    border-radius: 50%;
  }
}

.header {
  padding: 1rem;
  display: flex;
  border-bottom: 1px solid rgb(158, 158, 158);

  &__logo {
    height: 4rem;
    width: 4rem;
    margin-left: 1rem;
  }

  .navigation {
    display: flex;
    flex-grow: 2;
    align-items: center;
    justify-content: space-around;

    &__link {
      &--dead {
        cursor: not-allowed;
        color: rgb(129, 129, 129);
        font-weight: 100;
      }
    }
  }
}

.content {
  margin: 2rem;
}
```
- Generate component CommentsList
``` html
<h2>Comments ({{ comments.length }})</h2>
<div *ngFor="let comment of comments">
  <mat-card>
    <mat-card-title> {{ comment.name }} </mat-card-title>
    <mat-card-subtitle>{{ comment.email }}</mat-card-subtitle>
    <mat-card-content>
      {{ comment.body }}
    </mat-card-content>
    <mat-card-actions>
      <button mat-button color="accent">LIKE</button>
      <button mat-button color="primary">SHARE</button>
    </mat-card-actions>
  </mat-card>
  <br />
</div>

```
```ts
import { Component, Input } from '@angular/core';
import { Comment } from '../../models';

@Component({
  selector: 'blogspot-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent {
  @Input() comments!: Array<Comment>;
}
```
- Generate CommnetsList component
``` html
<mat-card>
  <mat-card-title-group>
    <mat-card-title>{{ post.title }}</mat-card-title>
    <mat-card-subtitle>{{ post.author }}</mat-card-subtitle>
    <img src="https://picsum.photos/200" mat-card-avatar />
  </mat-card-title-group>
  <img mat-card-image src="https://picsum.photos/1000/500" alt="Photo of a Shiba Inu">
  <mat-card-content>
    {{ post.body }}
  </mat-card-content>
</mat-card>

```
``` ts
import { Component, Input } from '@angular/core';
import { Post } from '../../models';

@Component({
  selector: 'blogspot-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.scss']
})
export class PostDisplayComponent {
  @Input() post!: Post;
}
```
- Generate PostGrid component
``` html
<mat-card>
  <mat-card-title-group>
    <mat-card-title>Recent blogposts</mat-card-title>
    <form>
      <mat-form-field appearance="fill">
        <mat-label>Search</mat-label>
        <input
          type="search"
          matInput
          [formControl]="searchFormControl"
          placeholder="search phrase"
          (input)="onSearch($event)"
        />
      </mat-form-field>
    </form>
  </mat-card-title-group>

  <mat-card-content>
    <ngx-datatable
      class="material post_grid"
      [rows]="posts"
      [columnMode]="'force'"
      [headerHeight]="0"
      [footerHeight]="50"
      [loadingIndicator]="loading"
      rowHeight="auto"
      [limit]="5"
    >
      <ngx-datatable-column name="" [sortable]="false" [maxWidth]="150">
        <ng-template let-column="column" ngx-datatable-header-template>
        </ng-template>
        <ng-template
          let-value="value"
          let-row="row"
          ngx-datatable-cell-template
        >
          <img
            class="post_grid__img"
            src="https://picsum.photos/seed/{{ row.id }}/100"
          />
        </ng-template>
      </ngx-datatable-column>
      <ngx-datatable-column name="Title">
        <ng-template let-column="column" ngx-datatable-header-template>
          <h1>Recent blog posts:</h1>
        </ng-template>
        <ng-template
          let-value="value"
          let-row="row"
          ngx-datatable-cell-template
        >
          <a class="post_grid__title" [routerLink]="['./posts', row.id]">
            <h2>{{ row.title }}</h2>
          </a>
          <p class="post_grid__author">
            {{ row.author }}
          </p>
        </ng-template>
      </ngx-datatable-column>
    </ngx-datatable>
  </mat-card-content>
</mat-card>
```
``` scss
.post_grid {
  box-shadow: none;
  &__title {
    color: #3f51b5;
    text-transform: uppercase;
    text-decoration: none;
  }

  &__author {
    color: #ff4081;
  }

  &__img {
    width: 5rem;
    height: 5rem;
  }
}
```
``` ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { PostListItem } from '../../models';

@Component({
  selector: 'blogspot-post-grid',
  templateUrl: './post-grid.component.html',
  styleUrls: ['./post-grid.component.scss'],
})
export class PostGridComponent {
  @Input() posts!: Array<PostListItem>;
  @Input() loading!: boolean;
  @Output() search: EventEmitter<string> = new EventEmitter();

  searchPhraseChanges = new Subject<string>();
  searchFormControl = new FormControl('');

  constructor() {
    this.searchPhraseChanges.pipe(
      filter(x => x.length > 3),
      distinctUntilChanged(),
      debounceTime(500)
    ).subscribe(this.search);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSearch(event: any) {
    this.searchPhraseChanges.next(event.target.value)
  }
}
```
- Update components/index.ts
```ts
import { CommentsListComponent } from "./comments-list/comments-list.component";
import { PostDisplayComponent } from "./post-display/post-display.component";
import { PostGridComponent } from "./post-grid/post-grid.component";

export * from "./comments-list/comments-list.component";
export * from "./post-display/post-display.component";
export * from "./post-grid/post-grid.component";

export const COMPONENTS = [
  CommentsListComponent,
  PostDisplayComponent,
  PostGridComponent
];
```
- Update container post.component
```html
<blogspot-post-display [post]="post"></blogspot-post-display>
<br/>
<br/>
<blogspot-comments-list [comments]="comments"> </blogspot-comments-list>
```
```ts
import { Component } from '@angular/core';
import { Post, Comment } from '../../models';

@Component({
  selector: 'blogspot-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  post: Post;
  comments: Array<Comment>;

  constructor() {
    this.post = {
      author: 'John Doe',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      title: 'Splendid',
      authorId: 1,
      id: 1,
    };

    this.comments = [
      {
        "postId": 1,
        "id": 1,
        "name": "id labore ex et quam laborum",
        "email": "Eliseo@gardner.biz",
        "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
      },
      {
        "postId": 1,
        "id": 2,
        "name": "quo vero reiciendis velit similique earum",
        "email": "Jayne_Kuhic@sydney.com",
        "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
      },
      {
        "postId": 1,
        "id": 3,
        "name": "odio adipisci rerum aut animi",
        "email": "Nikita@garfield.biz",
        "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
      },
      {
        "postId": 1,
        "id": 4,
        "name": "alias odio sit",
        "email": "Lew@alysha.tv",
        "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
      },
      {
        "postId": 1,
        "id": 5,
        "name": "vero eaque aliquid doloribus et culpa",
        "email": "Hayden@althea.biz",
        "body": "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
      },
    ];
  }
}
```
- Update container posts.component
``` html
<blogspot-post-grid [posts]="posts" [loading]="loading" (search)="onSearch($event)">
</blogspot-post-grid>
```
``` ts
import { Component } from '@angular/core';
import { PostListItem } from '../../models';

@Component({
  selector: 'blogspot-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  posts: Array<PostListItem>;
  loading: boolean;

  constructor() {
    this.loading = true;
    this.posts = [
      {
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        author: 'John Doe',
        authorId: 1,
      },
      {
        id: 2,
        title: 'qui est esse',
        author: 'John Doe',
        authorId: 1,
      },
      {
        id: 3,
        title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        author: 'John Doe',
        authorId: 1,
      },
      {
        id: 4,
        title: 'eum et est occaecati',
        author: 'John Doe',
        authorId: 1,
      },
      {
        id: 5,
        title: 'nesciunt quas odio',
        author: 'Jahne Doe',
        authorId: 2,
      },
      {
        id: 6,
        title: 'dolorem eum magni eos aperiam quia',
        author: 'Jahne Doe',
        authorId: 2,
      },
      {
        id: 7,
        title: 'magnam facilis autem',
        author: 'John Doe',
        authorId: 1,
      },
      {
        id: 8,
        title: 'dolorem dolore est ipsam',
        author: 'John Doe',
        authorId: 1,
      },
      {
        id: 9,
        title: 'nesciunt iure omnis dolorem tempora et accusantium',
        author: 'Jahne Doe',
        authorId: 2,
      },
    ];
  }

  onSearch(searchPhrase: string) {}
}
```
- Update posts containers index
```ts
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';

export * from './posts/posts.component';
export * from './post/post.component';

export const CONTAINERS = [
  PostsComponent,
  PostComponent
];
```
- Generate profile component VCard
```html
<mat-card class="vcard">
  <mat-card-header>
    <div mat-card-avatar></div>
    <mat-card-title>{{ profile.name }}</mat-card-title>
    <mat-card-subtitle>{{ profile.email }}</mat-card-subtitle>
  </mat-card-header>
  <img mat-card-image src="{{ profile.photoUrl }}" />
  <mat-card-content>
    <p>Phone: {{ profile.phone }}</p>
  </mat-card-content>
</mat-card>
```
```ts
import { Component, Input } from '@angular/core';
import { UserProfile } from '../../models';

@Component({
  selector: 'blogspot-vcard',
  templateUrl: './vcard.component.html',
  styleUrls: ['./vcard.component.scss'],
})
export class VcardComponent {
  @Input() profile!: UserProfile;
}
```
- Update profile component index.ts
```ts
import { VcardComponent } from './vcard/vcard.component';

export * from './vcard/vcard.component';

export const COMPONENTS = [
  VcardComponent
];
```
- Update container profile.component
``` html
<blogspot-vcard [profile]="profile"> </blogspot-vcard>
```
``` ts
import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../models';

@Component({
  selector: 'blogspot-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: UserProfile;

  constructor() {
    this.profile = {
      email: 'test@email.com',
      id: 1,
      name: 'John Doe',
      phone: '123-456-789',
      photoUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    };
  }

  ngOnInit(): void {}
}
```
# Unit 2
- nx add @ngrx/store@latest --minimal false
- nx add @ngrx/store-devtools@latest
- nx add @ngrx/effects@latest
- ng add @ngrx/router-store@latest
- Copy workshop_assets/db.ts into app/services/db.ts
- Generate service app/services/api-client.service.ts
```ts
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
```

- vscode nx generate @ngrx/schematics:feature (name: profile, module: profile, api: true, group: true)

- Update profile.actions.ts
```ts
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
```
- Update profile.reducer.ts
```ts
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
```

- Update profile.selectors
```ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfile from '../reducers/profile.reducer';

export const selectProfileState = createFeatureSelector<fromProfile.State>(
  fromProfile.profileFeatureKey
);

export const selectProfile = createSelector(selectProfileState, x => x.userProfile)
```
- Update effects.ts
```ts
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
```
- Update profile container
```ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserProfile } from '../../models';
import * as ProfileActions from '../../actions/profile.actions';
import * as ProfileSelectors from '../../selectors/profile.selectors';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'blogspot-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile$: Observable<UserProfile>;

  constructor(private store: Store) {
    this.profile$ = this.store.select(ProfileSelectors.selectProfile).pipe(
      filter((x) => x != undefined),
      map((x) => x!)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(ProfileActions.loadProfile());
  }
}
```
```html
<blogspot-vcard *ngIf="profile$ | async" [profile]="(profile$ | async)!"> </blogspot-vcard>
```

- vscode nx generate @ngrx/schematics:feature (name: posts, module: posts, api: true, group: true)
- Update posts.actions.ts
```ts
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
```
- Update posts.reducer.ts
```ts
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
```
- Update posts.selectors.ts
```ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPosts from '../reducers/posts.reducer';

export const selectPoststate = createFeatureSelector<fromPosts.State>(
  fromPosts.postsFeatureKey
);

export const selectPostsListItems = createSelector(selectPoststate, x => x.list.data);

export const selectPostsListLoading = createSelector(selectPoststate, x => x.list.loading)

export const getPostDetails = createSelector(selectPoststate, x => x.details)
```
- Update posts.effects.ts
```ts
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
```
- Update posts container
```ts
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
```
```html
<blogspot-post-grid
  [posts]="(posts$ | async)!"
  [loading]="(loading$ | async)!"
  (search)="onSearch($event)"
>
</blogspot-post-grid>
```
- Update post container
```ts
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
```
```html
<blogspot-post-display [post]="(post$ | async)!"></blogspot-post-display>
<br />
<br />
<blogspot-comments-list [comments]="(comments$ | async)!">
</blogspot-comments-list>
```
