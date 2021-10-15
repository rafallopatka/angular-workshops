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
