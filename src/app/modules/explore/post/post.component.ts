import { Component, Input, OnInit } from '@angular/core';
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
  randomImage: any;
  imagesArray = [
    "assets/311458.jpg",
    "assets/46974.jpg",
    "assets/114735.jpg",
    "assets/145685.jpg",
    "assets/311458.jpg",
    "assets/796620.jpg",
    "assets/1011302.jpg",
    "assets/1122626.jpg",
    "assets/1169084.jpg",
    "assets/1233414.jpg",
    "assets/1408199.jpg",
    "assets/1578244.jpg",
    "assets/1599969.jpg",
    "assets/4273436.jpg",
    "assets/4621652.jpg",
    "assets/plant.jpg",
    "assets/plants-login-1.jpg"
  ]


  constructor(private authService: AuthService, private databaseService: DatabaseService) {
    this.isLoggedIn = authService.currentUser !== null ? true : false;    
  }

  async ngOnInit(): Promise<void> {
    this.isAuthor = this.isLoggedIn && this.authService.currentUser?.id !== this.post.user_id ? true : false;
    this.isFollowed = this.isLoggedIn ? await this.checkIfSubscriptionExists() : false;
    this.randomImage = this.imagesArray[Math.floor(Math.random() * this.imagesArray.length)];
  }

  async subscribe() {
    try {
      await this.databaseService.subscribe(this.authService.currentUser?.id, this.post.user_id);
    } catch (error) {
      console.log(error);
    }
  }

  async unSubscribe() {
    try {
      await this.databaseService.unSubscribe(this.authService.currentUser?.id, this.post.user_id);
    } catch (error) {
      console.log(error);
    }
  }

  async checkIfSubscriptionExists() {
    this.sub = await this.databaseService.getSubscription(this.authService.currentUser?.id, this.post.user_id);
    if (this.sub.body.length > 0) {
      return true;
    }
    return false;
  }

  getPostTagList() {
    return this.post.tags && this.post.tags.tagsList ? this.post.tags.tagsList.join(', ') : '';
  }


}
