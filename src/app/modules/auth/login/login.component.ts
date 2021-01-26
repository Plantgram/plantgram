import { AccountService } from 'src/app/core/services/account.service';

import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl'],
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  submitted = false;
  isPasswordVisible = false;
  loginError: any;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.form.get('email');
  }

  async onSubmit() {
    this.submitted = true;
    this.loginError = null;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    const { user, error } = await this.accountService.signIn(
      this.form.getRawValue()
    );

    if (!error && user) {
      this.router.navigateByUrl('/');
    }
    this.loginError = error;
  }
}
