import { BehaviorSubject, Observable } from 'rxjs';
import { SUPABASE_CLIENT } from 'src/app/supabase-client';

import { Inject, Injectable } from '@angular/core';
import { SupabaseClient, User } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public readonly currentUser$: Observable<User | null>;
  localStorageToken = localStorage.getItem('supabase.auth.token');

  constructor(@Inject(SUPABASE_CLIENT) private supabaseClient: SupabaseClient) {
    this.userSubject = new BehaviorSubject(
      this.localStorageToken ? JSON.parse(this.localStorageToken).currentSession.user : null
    );
    this.currentUser$ = this.userSubject.asObservable();
  }

  public get currentUser(): User | null {
    return this.userSubject.value;
  }

  async signIn(credentials: { email?: string; password?: string; provider?: 'github' | 'google' }) {
    const { user, error } = await this.supabaseClient.auth.signIn(credentials);
    this.userSubject.next(user);
    return { user, error };
  }

  async register(credentials: { firstname: string; lastname: string; email: string; password: string }) {
    // Register a user inside private user table
    const { user, error } = await this.supabaseClient.auth.signUp(credentials);

    await this.supabaseClient.from('users').insert([{
      id: user?.id,
      first_name: credentials.firstname,
      last_name: credentials.lastname,
    }]);

    // Return user and log him in
    this.userSubject.next(user);
    return { user, error };
  }

  async signOut() {
    try {
      const { error } = await this.supabaseClient.auth.signOut();
      if (error === null) {
        this.userSubject.next(null);
      }
      else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  update() {
    // TODO
  }
}
