import { NgxMasonryOptions } from 'ngx-masonry';
import { SUPABASE_CLIENT } from 'src/app/supabase-client';

import {
    Component,
    Inject,
    OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SupabaseClient } from '@supabase/supabase-js';

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

  constructor(@Inject(SUPABASE_CLIENT) private supabaseClient: SupabaseClient, public dialog: MatDialog) {}
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
    const { data, error } = await this.supabaseClient
      .from('posts')
      .select(`id, created_at, user_id, title, description, images_path`);
    return data;
  }
}
