import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { createClient, User } from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private supabaseClient;
  private userSubject: BehaviorSubject<User | null>;
  public readonly currentUser$: Observable<User | null>;

  constructor() {
    const { url, key } = environment.supabase;
    this.supabaseClient = createClient(url, key);
    this.userSubject = new BehaviorSubject(this.supabaseClient.auth.user());
    this.currentUser$ = this.userSubject.asObservable();
  }

  public get currentUser(): User | null {
    return this.userSubject.value;
  }

  async signIn(credentials: { email?: string; password?: string; provider?: 'github' | 'google' }) {
    const { user, error } = await this.supabaseClient.auth.signIn(credentials);
    this.userSubject.next(user);
    console.log(user);
    return { user, error };
  }

  async register(credentials: { firstname: string; lastname: string; email: string; password: string }) {
    // Register a user inside private user table
    const { user, error } = await this.supabaseClient.auth.signUp(credentials);

    // Register a user inside public user table - that can be used for relations between tables
    await this.supabaseClient.from('users').insert([{ id: user?.id }]);

    await this.supabaseClient.from('user_profile').insert([
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
