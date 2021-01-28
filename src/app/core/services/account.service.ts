import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import {
    createClient,
    User,
} from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private supabaseClient;
  private userSubject = new BehaviorSubject<any>(null);
  public readonly user$ = this.userSubject.asObservable();

  constructor() {
    const { url, key } = environment.supabase;
    this.supabaseClient = createClient(url, key);
  }

  public get user(): User {
    return this.userSubject.value;
  }

  async signIn(credentials: {
    email?: string;
    password?: string;
    provider?: 'github' | 'google';
  }) {
    const { user, error } = await this.supabaseClient.auth.signIn(credentials);
    this.userSubject.next(user);
    return { user, error };
  }

  async register(credentials: {
    email: string;
    password: string;
  }) {
    const { user, error } = await this.supabaseClient.auth.signUp(credentials);
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
