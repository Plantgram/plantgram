import { environment } from 'src/environments/environment';

import { Component } from '@angular/core';
import {
    FormControl,
    Validators,
} from '@angular/forms';
import { createClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent {
  password = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  supabaseClient: any;
  isVisible = false;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(){
    const {url, key} = environment.supabase;
    this.supabaseClient = createClient(url, key);
  }

  async onSignIn(email='anyname@codemonkey.wtf', password='123'){
    if(email&&password){
      let { user, error } = await this.supabaseClient.auth.signIn({
        email,
        password
      })
      console.log(user, error, "signup")
    }
  }
}
