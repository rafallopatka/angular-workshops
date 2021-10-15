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
