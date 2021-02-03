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
  isLoggedIn: any;
  notLoggedInUserProfile: any;
  isFollowed: any;
  isNotFollowed: any;
  sub: any;

  constructor(
    private Activatedroute: ActivatedRoute,
    private authService: AuthService,
    private dbService: DatabaseService
  ) {
    this.isLoggedIn = (authService.currentUser !== null) ? true : false;
  }

  ngOnInit(): void {
    this.request = this.Activatedroute.paramMap.subscribe(async (params) => {
      this.id = params.get('id');
      this.notLoggedInUserProfile = (this.authService.currentUser?.id !== this.id) ? true : false;
      this.user = await this.getUserProfile();
      this.isFollowed = await this.checkIfSubscriptionExists();
    });
  }

  async getUserProfile() {
    const req = await this.dbService.getUserProfile(this.id);
    return req?.body && req.body[0];
  }

  async subscribe() {
    try {
      await this.dbService.subscribe(this.authService.currentUser?.id, this.user.id);
    } catch (error) {
      console.log(error);
    }
  }

  async unSubscribe() {
    try {
      await this.dbService.unSubscribe(this.authService.currentUser?.id, this.user.id);
    } catch (error) {
      console.log(error);
    }
  }

  async checkIfSubscriptionExists() {
    this.sub = await this.dbService.getSubscription(this.authService.currentUser?.id, this.user.id);
    if (this.sub.body.length > 0) {
      return true;
    }

    return false;
  }
}
