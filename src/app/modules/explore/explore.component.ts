import { environment } from 'src/environments/environment';
import { NewPostComponent } from '../new-post/new-post.component';

import {
    Component,
    OnInit,
} from '@angular/core';
import { createClient } from '@supabase/supabase-js';

import { new_mock } from '../../../assets/new_mock';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.styl']
})
export class ExploreComponent implements OnInit{
  posts = new_mock;
  supabaseClient: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(){
    // Create a single supabase client for interacting with your database
    const {url, key} = environment.supabase;
    this.supabaseClient = createClient(url, key);
  }

  openNewPostDialog(): void {
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  async onGetPosts() {
    const { data, error } = await this.supabaseClient
      .from('posts')
      .select(`id, created_at, user_id, title, description`)
    console.log(data, error,"supabase")
  }
}
