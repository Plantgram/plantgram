import { mock_data } from 'src/assets/mock_data';

import {
    Component,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.styl'],
})
export class UserComponent implements OnInit {
  id: any;
  request: any;
  user: any;

  constructor(private _Activatedroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.request = this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log(this.id, 'ID');
      this.user = mock_data.find((opt) => opt.id == this.id);
    });
  }
}
