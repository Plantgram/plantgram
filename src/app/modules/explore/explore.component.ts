import { NgxMasonryOptions } from 'ngx-masonry';
import { AccountService } from 'src/app/core/services/account.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from '../../core/services/database.service';

import { new_mock } from '../../../assets/new_mock';
import { NewPostComponent } from '../new-post/new-post.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.styl'],
})
export class ExploreComponent implements OnInit {
  posts = new_mock;
  dbPosts: any;

  public myOptions: NgxMasonryOptions = {
    gutter: 20,
  };

  constructor(private _dbService: DatabaseService, public dialog: MatDialog) { }
  async ngOnInit(): Promise<void> {
      this.dbPosts = await this.getPosts();
  }

  openNewPostDialog(): void {
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  async getPosts() {
    const { data, error } = await this._dbService.client
    .from('posts')
    .select(`id, created_at, user_id, title, description, images_path`);
    return data;
  }

}
