import { environment } from 'src/environments/environment';
import { DatabaseService } from "../../../api/database.service";

import {
    Component,
    OnInit,
} from '@angular/core';
import {
    FormControl,
    Validators,
} from '@angular/forms';
import { createClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.styl'],
})
export class SignupComponent {
  password = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  users: any;
  supabaseClient: any;
  isVisible = false;

  constructor(private databaseService: DatabaseService) {
    this.supabaseClient = databaseService;
  }

  // ngOnInit() {
  //   const { url, key } = environment.supabase;
  //   this.supabaseClient = createClient(url, key);
  // }

  GetUSers() {
    this.users = this.supabaseClient.getUsers();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  // async onSignUp() {
  //   let { user, error } = await this.supabaseClient.auth.signUp({
  //     email: 'anyname@codemonkey.wtf',
  //     password: '123',
  //   });
  //   console.log(user, error, 'signup');
  // }
}
