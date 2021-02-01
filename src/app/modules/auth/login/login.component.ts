import { AccountService } from 'src/app/core/services/account.service';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

const NUMBER_OF_AVAILABLE_IMAGES = 4;

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
  imageUrl: string;
  returnUrl = '/';

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      },
      { updateOn: 'blur' }
    );
    this.imageUrl = `assets/login-images/plant-0${Math.floor(Math.random() * NUMBER_OF_AVAILABLE_IMAGES) + 1}.jpg`;
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get email() {
    return this.form.get('email');
  }

  async onGithubLogin() {
    const { user, error } = await this.accountService.signIn({ provider: 'github' });

    if (!error && user) {
      this.router.navigate([this.returnUrl]);
    }
    this.loginError = error;
  }

  async onSubmit() {
    this.submitted = true;
    this.loginError = null;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    const { user, error } = await this.accountService.signIn(this.form.getRawValue());

    if (!error && user) {
      this.router.navigate([this.returnUrl]);
    }
    this.loginError = error;
  }
}
