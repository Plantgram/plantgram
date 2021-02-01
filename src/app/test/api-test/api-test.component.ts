import { Component } from '@angular/core';

import { DatabaseService } from '../../core/services/database.service';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.styl'],
})
export class ApiTestComponent {
  users: any;
  posts: any;

  constructor(private dbService: DatabaseService) {}

  async getUsers() {
    const promise = await this.dbService.getUsers();
    if (promise.error === null && promise.status === 200) {
      this.users = promise.data;
    } else {
      throw promise.error;
    }
  }

  async getPosts() {
    try {
      const promise = await this.dbService.getUserPosts(''); // FIXME: pass actual user id
      console.log(promise.data);
      this.posts = promise.data;
    } catch (error) {
      throw error;
    }
  }
}
