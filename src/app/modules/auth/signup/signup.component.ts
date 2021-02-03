import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

function matchPassword(group: AbstractControl) {
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

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.formBuilder.group(
      {
        firstname: [''],
        lastname: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: [''],
      },
      { validators: matchPassword, updateOn: 'blur' }
    );
    this.imageUrl = `assets/login-images/plant-0${Math.floor(Math.random() * NUMBER_OF_AVAILABLE_IMAGES) + 1}.jpg`;
  }

  get email() {
    return this.form.get('email');
  }

  async onSubmit() {
    this.submitted = true;
    this.signupError = null;
    this.loading = true;

    if (this.form.invalid) {
      return;
    }

    const { user, error } = await this.authService.register(this.form.getRawValue());

    if (!error && user) {
      this.router.navigateByUrl('/');
    }
    this.signupError = error;
  }
}
