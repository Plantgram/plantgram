import { AccountService } from 'src/app/core/services/account.service';

import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

function matchPassword(group: FormGroup) {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  // TODO check for touched/dirty controls
  return password === confirmPassword ? null : { passwordsNotMatching: true };
}

const NUMBER_OF_AVAILABLE_IMAGES = 4;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.styl'],
})
export class SignupComponent {
  form: FormGroup;
  loading = false;
  submitted = false;
  isPasswordVisible = false;
  signupError: any;
  imageUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) {
    this.form = this.formBuilder.group(
      {
        firstname: [''],
        lastname: [''],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: [''],
      },
      { validators: matchPassword }
    );
    this.imageUrl = `assets/login-images/plant-0${
      Math.floor(Math.random() * NUMBER_OF_AVAILABLE_IMAGES) + 1
    }.jpg`;
  }

  getErrorMessage() {
    const email = this.form.get('email');
    if (email && email.hasError('required')) {
      return 'You must enter a value';
    }
    if (email && email.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  async onSubmit() {
    this.submitted = true;
    this.signupError = null;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    const { user, error } = await this.accountService.register(
      this.form.getRawValue()
    );

    if (!error && user) {
      this.router.navigateByUrl('/');
    }
    this.signupError = error;
  }
}
