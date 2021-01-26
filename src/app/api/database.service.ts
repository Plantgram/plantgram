import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

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
    let { data, error } = await this.supabaseClient
    .from('user_cred')
    .select('*');  
    return data;
  }

  async getPosts() {
    let { data, error } = await this.supabaseClient
    .from('posts')
    .select('*');  
    return data;
  }
}
