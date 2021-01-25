import { environment } from 'src/environments/environment';

import {
    Component,
    OnInit,
} from '@angular/core';
import { createClient } from '@supabase/supabase-js';

import { new_mock } from '../../../assets/new_mock';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.styl']
})
export class ExploreComponent implements OnInit{
  posts = new_mock;
  supabaseClient: any;

  ngOnInit(){
    // Create a single supabase client for interacting with your database
    const {url, key} = environment.supabase;
    this.supabaseClient = createClient(url, key);
  }

  async onGetPosts() {
    const { data, error } = await this.supabaseClient
      .from('posts')
      .select(`id, created_at, user_id, title, description`)
    console.log(data, error,"supabase")
  }
}
