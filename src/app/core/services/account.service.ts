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

  async signIn(options: {
    email: string;
    password: string;
    provider?: 'github' | 'google';
  }) {
    const { user, error } = await this.supabaseClient.auth.signIn(options);
    this.userSubject.next(user);
    return { user, error };
  }

  register() {
    // TODO
  }

  signOut() {
    // TODO
  }

  update() {
    // TODO
  }
}
