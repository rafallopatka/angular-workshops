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
