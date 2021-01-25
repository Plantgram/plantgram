import { environment } from 'src/environments/environment';

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
export class SignupComponent implements OnInit {
  password = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  supabaseClient: any;
  isVisible = false;

  ngOnInit() {
    const { url, key } = environment.supabase;
    this.supabaseClient = createClient(url, key);
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  async onSignUp() {
    let { user, error } = await this.supabaseClient.auth.signUp({
      email: 'anyname@codemonkey.wtf',
      password: '123',
    });
    console.log(user, error, 'signup');
  }
}
