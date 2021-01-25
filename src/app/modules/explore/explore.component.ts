import { Component } from '@angular/core';

import { new_mock } from '../../../assets/new_mock';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.styl']
})
export class ExploreComponent {
  posts = new_mock;
}
