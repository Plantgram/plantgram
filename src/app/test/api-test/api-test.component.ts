import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../api/database.service';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.styl']
})
export class ApiTestComponent {

  service: any;
  users: any;
  posts: any;

  constructor(private dbService: DatabaseService) {
    this.service = dbService; 
  }  

  GetUsers() {
    this.users = this.service.getUsers()
    this.users.then (
      res => {
        return res;
      }
    );
  }

  GetPosts() {
    this.posts = this.service.getPosts()
    this.posts.then (
      res => {
        return res
      }
    );
  }
}
