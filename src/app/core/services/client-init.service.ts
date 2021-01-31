import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})

export class SupabaseClientInit{
  public supabaseClient: SupabaseClient;
  constructor() {
    const { url, key } = environment.supabase;
    this.supabaseClient = createClient(url, key, {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    });
   
    this.supabaseClient.auth.onAuthStateChange((event, session) => {      
      console.log(event, session);
      console.log(JSON.parse(localStorage.getItem('supabase.auth.token')!));
    })
  }
}