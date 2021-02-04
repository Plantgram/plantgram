import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MobileToolbarComponent } from './mobile-toolbar/mobile-toolbar.component';

@NgModule({
  imports: [RouterModule.forChild([]), SharedModule],
  exports: [AuthLayoutComponent, MainLayoutComponent],
  declarations: [MainLayoutComponent, AuthLayoutComponent, MobileToolbarComponent],
})
export class LayoutModule {}
