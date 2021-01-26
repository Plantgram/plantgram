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

  async getUsers() {
    let promise = await this.service.getUsers();
    if(promise.error === null && promise.status === 200)
       this.users = promise.data;
    else
      throw(promise.error)      
  }

  async getPosts() {
    try {
      let promise = await this.service.getPosts();
      console.log(promise.data)
      this.posts = promise.data;
    } catch (error) {
      throw(error);
    }
  }
}
