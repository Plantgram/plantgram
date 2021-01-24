import { SharedModule } from 'src/app/shared/shared.module';

import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    AuthRoutingModule,
    SharedModule,
  ]
})
export class AuthModule { }
