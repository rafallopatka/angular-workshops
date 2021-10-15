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
