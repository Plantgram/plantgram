import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialUiModule } from './angular-material-ui.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ExploreComponent } from './explore/explore.component';
import { MobileToolbarComponent } from './mobile-toolbar/mobile-toolbar.component';
import { ButtonExample } from './shared/components/button-example/button-example.component';
import { PlantgramLogoComponent } from './shared/components/plantgram-logo/plantgram-logo.component';
import { PostComponent } from './shared/post/post.component';
import { UserComponent } from './shared/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    PlantgramLogoComponent,
    LoginComponent,
    RegisterComponent,
    ButtonExample,
    ExploreComponent,
    PostComponent,
    UserComponent,
    MobileToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularMaterialUiModule
  ],
  bootstrap: [AppComponent],
  exports: [MobileToolbarComponent]
})
export class AppModule { }
