import { SharedModule } from 'src/app/shared/shared.module';

import { NgModule } from '@angular/core';

import { ApiTestRoutingModule } from './api-test-routing.module';
import { ApiTestComponent } from './api-test.component';

@NgModule({
  declarations: [ApiTestComponent],
  imports: [ApiTestRoutingModule, SharedModule],
})
export class ApiTestModule {}
