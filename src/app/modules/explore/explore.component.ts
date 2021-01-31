import { NgxMasonryOptions } from 'ngx-masonry';
import { AccountService } from 'src/app/core/services/account.service';
import { environment } from 'src/environments/environment';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { createClient } from '@supabase/supabase-js';

import { new_mock } from '../../../assets/new_mock';
import { NewPostComponent } from '../new-post/new-post.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.styl'],
})
export class ExploreComponent implements OnInit {
  posts = new_mock;
  supabaseClient: any;

  public myOptions: NgxMasonryOptions = {
    gutter: 20,
  };

  constructor(private accountService: AccountService, public dialog: MatDialog) {}

  ngOnInit() {
    // Create a single supabase client for interacting with your database
    const { url, key } = environment.supabase;
    this.supabaseClient = createClient(url, key);

    console.log(this.accountService.currentUser, 'is logged in');
  }

  openNewPostDialog(): void {
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  async onGetPosts() {
    const { data, error } = await this.supabaseClient
      .from('posts')
      .select(`id, created_at, user_id, title, description`);
    console.log(data, error, 'supabase');
  }
}
