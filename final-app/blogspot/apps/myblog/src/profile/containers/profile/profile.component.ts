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
