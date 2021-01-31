import { NgxMasonryOptions } from 'ngx-masonry';
import { AccountService } from 'src/app/core/services/account.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from '../../core/services/database.service';

import { new_mock } from '../../../assets/new_mock';
import { NewPostComponent } from '../new-post/new-post.component';
import { SupabaseClientInit } from 'src/app/core/services/client-init.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.styl'],
})
export class ExploreComponent implements OnInit {
  posts = new_mock;
  client: any;

  public myOptions: NgxMasonryOptions = {
    gutter: 20,
  };

  constructor(private dbService: DatabaseService, public dialog: MatDialog) {
    this.client = this.dbService;
  }

  ngOnInit() {
    console.log(this.client.currentUser.id);
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
    const { data, error } = await this.client
      .from('posts')
      .select(`id, created_at, user_id, title, description`);
    console.log(data, error, 'supabase');
  }
}
