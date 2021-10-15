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
