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
