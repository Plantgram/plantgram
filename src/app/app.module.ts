import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [{
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: { appearance: 'fill' },
  }],
  bootstrap: [AppComponent],
  exports: [MobileToolbarComponent]
})
export class AppModule { }
