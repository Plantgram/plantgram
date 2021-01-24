import { SharedModule } from 'src/app/shared/shared.module';

import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
