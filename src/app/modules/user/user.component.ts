import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DatabaseService } from '../../api/database.service';
import { AccountService } from '../../core/services/account.service';

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
    private accountService: AccountService,
    private dbService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.request = this.Activatedroute.paramMap.subscribe(async () => {
      this.id = this.accountService.currentUser?.id;
      this.user = await this.getUserProfile();
    });
  }

  async getUserProfile() {
    const req = await this.dbService.getUserProfile(this.id);
    return req && Array.isArray(req) && req.body[0];
  }
}
