import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  supabaseClient: SupabaseClient;
  
  constructor() {
    const {url, key} = environment.supabase;
    this.supabaseClient = createClient(url, key);    
  }

  async getUsers() {
    return await this.supabaseClient
    .from('user_cred')
    .select('*');      
  }

  async getPosts() {
    return await this.supabaseClient
    .from('posts')
    .select('*');  
  }

  async insertPost(data: any) {
    try {
      await this.supabaseClient
      .from('posts')
      .insert([
        { 
          user_id: uuidv4(), // TODO: FETCH AUTHENTHICATED USER_ID - CURRENTLY NEW UUID IS FOR TESTING ONLY,
          title: data.title, 
          description: data.description,
          tags: {tagsList: data.tags},
          images_path: {imagesList: data.images}
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }
}
