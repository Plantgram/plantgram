import {
    Component,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { DatabaseService } from '../../core/services/database.service';

interface User {
  id: string;
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
  userPosts: any;
  userPostsNumber = 0;
  userFollowers: any;
  userFollowing: any;
  userFollowersNumber = 0;
  userFollowingNumber = 0;
  isLoggedIn = false;
  notLoggedInUserProfile = false;
  isFollowed = false;
  // isNotFollowed!: boolean;
  sub: any;

  constructor(
    private Activatedroute: ActivatedRoute,
    private authService: AuthService,
    private dbService: DatabaseService
  ) {
    this.isLoggedIn = (authService.currentUser !== null) ? true : false;
  }

  async ngOnInit(): Promise<void> {
    this.request = this.Activatedroute.paramMap.subscribe(async (params) => {
      this.id = params.get('id');
      this.user = await this.getUserProfile();
      this.notLoggedInUserProfile = (this.authService.currentUser?.id !== this.id) ? true : false;
      this.isFollowed = (this.isLoggedIn) ? await this.checkIfSubscriptionExists() : false;
      await this.getUserPosts();
      this.userFollowers = await this.getUserFollowers(this.id);
      this.userFollowersNumber = (this.userFollowers.length > 0) ? this.userFollowers.length : 0;
      this.userFollowing = await this.getUserFollowing(this.id);
      this.userFollowingNumber = (this.userFollowing.length > 0) ? this.userFollowers.length : 0;
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

  async getUserPosts() {
    try {
      this.userPosts = await this.dbService.getUserPosts(this.user.id);
      this.userPostsNumber = this.userPosts.body.length;
      return this.userPosts;
    } catch (error) {
      return [];
    }
  }

  async getUserFollowers(id: string) {
    try {
      const data = await this.dbService.getUserFollowers(id);
      return data.body;
    } catch (error) {
      return [];
    }
  }

  async getUserFollowing(id: string) {
    try {
      const data = await this.dbService.getUserFollowers(id);
      return data.body;
    } catch (error) {
      return [];
    }
  }
}
