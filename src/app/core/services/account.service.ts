import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { SupabaseClientInit } from './client-init.service';

@Injectable({ providedIn: 'root' })

export class AccountService {
  client: any;  
  private userSubject: BehaviorSubject<User | null>;
  public readonly currentUser$: Observable<User | null>;
  localStorageToken = localStorage.getItem('supabase.auth.token');

  constructor(private _client: SupabaseClientInit ) {
    this.client = this._client.supabaseClient;
    this.userSubject = this.localStorageToken !== null ? new BehaviorSubject(JSON.parse(localStorage.getItem('supabase.auth.token')!).currentSession.user) : new BehaviorSubject<User | null>(null);      
    this.currentUser$ = this.userSubject.asObservable();
  }

  public get currentUser(): User | null {
    return this.userSubject.value;
  }

  async signIn(credentials: { email?: string; password?: string; provider?: 'github' | 'google' }) {    
    const { user, error } = await this.client.auth.signIn(credentials);   
    this.userSubject.next(user);    
    return { user, error };
  }

  async register(credentials: { firstname: string; lastname: string; email: string; password: string }) {
    // Register a user inside private user table
    const { user, error } = await this.client.auth.signUp(credentials);
  
    await this.client.from('users').insert([{ id: user?.id }]);
    await this.client.from('user_profile').insert([
      {
        user_id: user?.id,
        first_name: credentials.firstname,
        last_name: credentials.lastname,
      },
    ]);

    // Return user and log him in
    this.userSubject.next(user);
    return { user, error };
  }

  signOut() {
    // TODO
  }

  update() {
    // TODO
  }
}
