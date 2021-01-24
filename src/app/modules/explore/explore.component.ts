import { Component } from '@angular/core';

import { mock_data } from '../../../assets/mock_data';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.styl']
})
export class ExploreComponent {
  posts = mock_data;
}
