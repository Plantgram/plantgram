import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.styl'],
})
export class PostComponent implements OnInit {
  @Input() post: any;
  sub: any;
  isLoggedIn: any;
  isAuthor: any;
  isFollowed: any;

  constructor(private authService: AuthService, private dbService: DatabaseService) {
    this.isLoggedIn = (authService.currentUser !== null) ? true : false;
  }

  async ngOnInit(): Promise<void> {
    this.isAuthor = (this.isLoggedIn && this.authService.currentUser?.id !== this.post.user_id) ? true : false;
    this.isFollowed = this.checkIfSubscriptionExists();
  }

  async subscribe() {
    try {
      await this.dbService.subscribe(this.authService.currentUser?.id, this.post.user_id);
    } catch (error) {
      console.log(error);
    }
  }

  async unSubscribe() {
    try {
      await this.dbService.unSubscribe(this.authService.currentUser?.id, this.post.user_id);
    } catch (error) {
      console.log(error);
    }
  }

  async checkIfSubscriptionExists() {
    this.sub = await this.dbService.getSubscription(this.authService.currentUser?.id, this.post.user_id);
    if (this.sub.body.length > 0) {
      return true;
    }

    return false;
  }
}
