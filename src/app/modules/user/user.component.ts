import {
    Component,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { DatabaseService } from '../../core/services/database.service';

interface User {
  first_name: string;
  last_name: string;
  about: string;
  user_image_path: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.styl'],
})
export class UserComponent implements OnInit {
  id: any;
  request: any;
  user: any;
  user_posts: any;

  constructor(
    private Activatedroute: ActivatedRoute,
    private authService: AuthService,
    private dbService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.request = this.Activatedroute.paramMap.subscribe(async (params) => {
      this.id = params.get('id');
      this.user = await this.getUserProfile();
    });
  }

  async getUserProfile() {
    const req = await this.dbService.getUserProfile(this.id);
    console.log(req);
    return req?.body && req.body[0];
  }
}
